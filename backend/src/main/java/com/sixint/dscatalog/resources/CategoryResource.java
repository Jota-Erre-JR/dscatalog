package com.sixint.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sixint.dscatalog.entities.Category;
import com.sixint.dscatalog.services.CategoryService;

/*Implementation of REST controller*/

@RestController
@RequestMapping(value = "/categories") /* resources route */
public class CategoryResource {

	@Autowired
	private CategoryService service;

	/* first end point */
	@GetMapping
	public ResponseEntity<List<Category>> findAll() {
		List<Category> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

}
