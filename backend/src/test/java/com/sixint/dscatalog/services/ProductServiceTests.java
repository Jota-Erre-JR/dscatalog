package com.sixint.dscatalog.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.sixint.dscatalog.dto.ProductDTO;
import com.sixint.dscatalog.entities.Category;
import com.sixint.dscatalog.entities.Product;
import com.sixint.dscatalog.repositories.CategoryRepository;
import com.sixint.dscatalog.repositories.ProductRepository;
import com.sixint.dscatalog.services.exceptions.DataBaseException;
import com.sixint.dscatalog.services.exceptions.ResourceNotFoundException;
import com.sixint.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;

	@Mock
	private ProductRepository repository;

	@Mock
	private CategoryRepository categoryRepository;

	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private PageImpl<Product> page;
	private Product product;
	private Category category;
	private ProductDTO productDTO;

	@BeforeEach
	void setup() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		product = Factory.createProduct();
		category = Factory.createCategory();
		productDTO = Factory.createProductDTO();
		page = new PageImpl<>(List.of(product));

		when(repository.findAll((Pageable)any())).thenReturn(page);
		
		when(repository.find(any(), any(), any())).thenReturn(page);

		when(repository.save(any())).thenReturn(product);

		when(repository.getOne(existingId)).thenReturn(product);
		when(repository.getOne(nonExistingId)).thenThrow(EntityNotFoundException.class);

		when(categoryRepository.getOne(existingId)).thenReturn(category);
		when(categoryRepository.getOne(nonExistingId)).thenThrow(EntityNotFoundException.class);

		when(repository.findById(existingId)).thenReturn(Optional.of(product));
		when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

		doNothing().when(repository).deleteById(existingId);
		doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);

	}

	@Test
	public void deletShouldDoNothingWhenIdExists() {

		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);

	}

	@Test
	public void deletShouldThrowResourceNotFoundExceptionWhenIdDoesntExists() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);

	}

	@Test
	public void deletShouldThrowDataBaseExceptionWhenDependentIdExists() {

		Assertions.assertThrows(DataBaseException.class, () -> {
			service.delete(dependentId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);

	}

	@Test
	public void findAllPageShouldReturnPAge() {

		Pageable pageable = PageRequest.of(0, 10);

		Page<ProductDTO> result = service.findAllPaged(0L, "", pageable);

		Assertions.assertNotNull(result);
	
	}

	@Test
	public void findByIdShouldReturnProductDTOWhenExistId() {

		ProductDTO result = service.findById(existingId);
		Assertions.assertNotNull(result);

		Mockito.verify(repository, Mockito.times(1)).findById(existingId);
	}

	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesntExists() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
			;
		});

		Mockito.verify(repository, Mockito.times(1)).findById(nonExistingId);
	}

	@Test
	public void updateShouldReturnProductDTOWhenExistId() {

		ProductDTO result = service.update(existingId, productDTO);

		Assertions.assertNotNull(result);

	}

	@Test
	public void updateShouldThrowResourceNotFoundExceptionWWhenIdDoesntExists() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId, productDTO);

		});

	}

}
