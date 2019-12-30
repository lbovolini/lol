package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.MatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<MatchHistory, Long> {
    List<MatchHistory> findByAccountId(String accountId);
}
