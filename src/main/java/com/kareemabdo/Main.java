package com.kareemabdo;

import com.kareemabdo.Customer.Customer;
import com.kareemabdo.Customer.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner (CustomerRepository customerRepository) {
        return args -> {
            Customer alex = new Customer("kareem",
                    "kareemabdo@gmail.com",
                    21);

            Customer alexa = new Customer("kareem",
                    "kareemabdo@gmail.com",
                    22);

            List<Customer> customers = List.of(alex,alexa);
            customerRepository.saveAll(customers);
        };
    }
}
