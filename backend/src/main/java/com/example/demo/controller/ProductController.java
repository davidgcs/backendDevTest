package com.example.demo.controller;

import com.example.demo.model.ProductDetail;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/{productId}/similar")
    public ResponseEntity<?> getSimilarProducts(@PathVariable String productId) {
        ProductDetail[] response = service.getSimilarProducts(productId);

        if (response == null) {
            return ResponseEntity.status(404).body("Product not found");
        }
        return ResponseEntity.ok(response);
    }
}
