package com.example.demo.service;

import com.example.demo.model.ProductDetail;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class ProductService {
    private final RestTemplate rest = new RestTemplate();
    private final String BASE_URL = "http://localhost:3001";

    public ProductDetail getProductById(String productId) {
        try {
            return rest.getForObject(BASE_URL + "/product/{id}", ProductDetail.class, productId);
        } catch (HttpClientErrorException.NotFound e) {
            // Si el producto no existe, devuelve null para manejar el 404 en el controlador
            return null;
        } catch (Exception e) {
            // Para otros errores, puedes lanzar una excepción o manejarlo como necesites
            e.printStackTrace();
            return null;
        }
    }

    public ProductDetail[] getSimilarProducts(String productId) {
        String[] ids;
        try {
            ids = rest.getForObject(
                    BASE_URL + "/product/{id}/similarids", String[].class, productId);
        } catch (Exception e) {
            return new ProductDetail[0];
        }
        if (ids == null)
            return new ProductDetail[0];

        return java.util.Arrays.stream(ids)
                .map(id -> {
                    try {
                        return rest.getForObject(
                                BASE_URL + "/product/{id}", ProductDetail.class, id);
                    } catch (Exception e) {
                        return new ProductDetail[0];
                    }
                })
                .filter(d -> d != null)
                .toArray(ProductDetail[]::new);
    }
}
