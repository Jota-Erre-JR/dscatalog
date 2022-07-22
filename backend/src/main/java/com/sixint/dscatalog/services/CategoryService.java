package com.sixint.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sixint.dscatalog.entities.Category;
import com.sixint.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	/*Transactional grant that transaction will be done inside the database and the readonly
	 *  increase the performance, avoid the locking of database.
	 */
	public List<Category> findAll(){
		return repository.findAll();
	}

}
