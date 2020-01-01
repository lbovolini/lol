package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.Summoner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SummonerRepository extends JpaRepository<Summoner, String> {
    @Query("SELECT s FROM Summoner s WHERE replace(s.name, ' ', '') = replace(?1 , ' ', '') AND s.platform = ?2 ")
    Summoner findByNameAndPlatform(String name, String platform);
}
