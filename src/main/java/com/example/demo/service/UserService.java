package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User registerNewUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already in use");
        }
        return userRepository.save(user);
    }
}