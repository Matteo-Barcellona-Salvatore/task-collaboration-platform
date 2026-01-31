package com.collaboration.repository;

import com.collaboration.model.Comment;
import com.collaboration.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByTaskOrderByCreatedAtDesc(Task task);
}