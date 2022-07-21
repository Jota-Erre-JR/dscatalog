package com.sixint.dscatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sixint.dscatalog.entities.Category;

/*Implementation of REST controller*/

@RestController
@RequestMapping(value = "/categories")/*resources route*/
public class CategoryResource {
	
/*first end point*/
	@GetMapping
	public ResponseEntity<List<Category>> findAll(){
		List<Category> list = new ArrayList<>();
		list.add(new Category(1L, "Books"));
		list.add(new Category(2L, "Electronics"));
		return ResponseEntity.ok().body(list);
	}

}
