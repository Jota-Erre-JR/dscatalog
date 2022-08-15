package com.sixint.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.sixint.dscatalog.entities.Product;
import com.sixint.dscatalog.tests.Factory;

@DataJpaTest
public class ProductRepositoryTests {

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;

	@BeforeEach
	void setup() throws Exception {
		
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
	}

	@Autowired
	private ProductRepository repository;
	
	@Test
	public void findByIdShouldReturnNonEmptyOptionalProductIdExists(){
		
		Optional<Product> product1 = repository.findById(existingId);

		Assertions.assertTrue(product1.isPresent());
	}
	
	@Test
	public void findByIdShouldReturnEmptyOptionalProductWhenIdDoesntExists(){
		
		Optional<Product> product2 = repository.findById(nonExistingId);

		Assertions.assertTrue(product2.isEmpty());
	}
	
	@Test
	public void insertShouldPersistWithAutoincrementWhenIdisNull() {
		
		Product product = Factory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1, product.getId());
	}

	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {

		repository.deleteById(existingId);

		Optional<Product> result = repository.findById(existingId);

		Assertions.assertFalse(result.isPresent());

	}

	@Test
	public void deleteShouldTrhowEmptyResultDataAccessExceptionWhenIdDoesntExists() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}

}
