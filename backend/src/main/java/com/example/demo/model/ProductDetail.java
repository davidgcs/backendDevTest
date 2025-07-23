package com.example.demo.model;
import lombok.Data;

@Data
public class ProductDetail {
    public String id;
    public String name;
    public Double price;
    public Boolean availability;
}