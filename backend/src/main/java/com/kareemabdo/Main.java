package com.kareemabdo;

import com.kareemabdo.Customer.Customer;
import com.kareemabdo.Customer.CustomerRepository;
import com.kareemabdo.Customer.Gender;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import java.util.Random;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner (CustomerRepository customerRepository) {
        return args -> {
            // Using Faker library to generate random customer data
            var faker = new Faker();
            Random random = new Random();

            // Generate random first and last names
            Name name = faker.name();
            String firstName = name.firstName();
            String lastName = name.lastName();

            int age = random.nextInt(16, 99);
            Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
            // Create a new Customer object with generated data
            Customer customer = new Customer(
                    firstName +  " " + lastName,
                    firstName.toLowerCase() + "." + lastName.toLowerCase() + "@kareemabdo.com",
                    age,
                    gender);

            // Save the generated customer to the database using the repository
            customerRepository.save(customer);
        };
    }
}
