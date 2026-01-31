package com.collaboration.service;

import com.collaboration.dto.TaskDTO;
import com.collaboration.model.Task;
import com.collaboration.model.User;
import com.collaboration.repository.TaskRepository;
import com.collaboration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO createTask(TaskDTO taskDTO, String username) {
        try {
            Task task = new Task();
            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setStatus(taskDTO.getStatus());
            task.setPriority(taskDTO.getPriority());
            task.setDueDate(taskDTO.getDueDate());
            task.setCreatedAt(LocalDateTime.now());
            task.setUpdatedAt(LocalDateTime.now());

            // Find user by username (optional - can be null for now)
            userRepository.findByUsername(username).ifPresent(user -> {
                task.setCreatedBy(user);
                task.setAssignedTo(user);
            });

            Task savedTask = taskRepository.save(task);
            return convertToDTO(savedTask);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating task: " + e.getMessage());
        }
    }

    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        try {
            Task task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setStatus(taskDTO.getStatus());
            task.setPriority(taskDTO.getPriority());
            task.setDueDate(taskDTO.getDueDate());
            task.setUpdatedAt(LocalDateTime.now());

            Task updatedTask = taskRepository.save(task);
            return convertToDTO(updatedTask);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating task: " + e.getMessage());
        }
    }

    public void deleteTask(Long id) {
        try {
            taskRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error deleting task: " + e.getMessage());
        }
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setPriority(task.getPriority());
        dto.setDueDate(task.getDueDate());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());

        if (task.getAssignedTo() != null) {
            dto.setAssignedToId(task.getAssignedTo().getId());
            dto.setAssignedToName(task.getAssignedTo().getFullName());
        }

        if (task.getCreatedBy() != null) {
            dto.setCreatedById(task.getCreatedBy().getId());
            dto.setCreatedByName(task.getCreatedBy().getFullName());
        }

        return dto;
    }
}