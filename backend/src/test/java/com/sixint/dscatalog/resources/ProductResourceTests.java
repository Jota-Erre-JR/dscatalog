package com.sixint.dscatalog.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sixint.dscatalog.dto.ProductDTO;
import com.sixint.dscatalog.services.ProductService;
import com.sixint.dscatalog.services.exceptions.DataBaseException;
import com.sixint.dscatalog.services.exceptions.ResourceNotFoundException;
import com.sixint.dscatalog.tests.Factory;
import com.sixint.dscatalog.tests.TokenUtil;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private TokenUtil tokenUtil;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private String username;
	private String password;
	
	private Long existingId;
	private Long nonExistingId;
	private Long dependentId;
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page;
	
	@BeforeEach
	void setup() throws Exception {
		
		username = "maria@gmail.com";
		password = "123456";
		
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		productDTO = Factory.createProductDTO();
		page = new PageImpl<>(List.of(productDTO));
		
		when(service.findAllPaged(any(), any(), any())).thenReturn(page);
		
		when(service.findById(existingId)).thenReturn(productDTO);
		when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		when(service.update(eq(existingId), any())).thenReturn(productDTO);
		when(service.update(eq(nonExistingId), any())).thenThrow(ResourceNotFoundException.class);
		
		when(service.insert( any())).thenReturn(productDTO);
	
		doNothing().when(service).delete(existingId);
		doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		doThrow(DataBaseException.class).when(service).delete(dependentId);
	
	}
	
	@Test
	public void findAllPagedShouldReturnPage() throws Exception{
		/*mockMvc.perform(get("/products")).andExpect(status().isOk());
		 * Modo mais usual em projetos.
		 */
		ResultActions result = mockMvc.perform(get("/products")
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() throws Exception{
		ResultActions result = mockMvc.perform(get("/products/{id}", existingId)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesntExists() throws Exception {
		ResultActions result = mockMvc.perform(get("/products/{id}", nonExistingId)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		ResultActions result = mockMvc.perform(put("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		
	}
	
	@Test
	public void updateShouldResturnNotFoundWhenIdDoesntExists() throws Exception {
		
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		ResultActions result = mockMvc.perform(put("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void insertShouldReturnProductDTOCreated() throws Exception {
		
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		ResultActions result = mockMvc.perform(post("/products", productDTO)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		
	}
		
	
	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		
		ResultActions result = mockMvc.perform(delete("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNoContent());
		
	}
	
	@Test
	public void deleteShouldReturnNotFoundWhenIdExists() throws Exception {
		
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		
		ResultActions result = mockMvc.perform(delete("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
		
	}
}
