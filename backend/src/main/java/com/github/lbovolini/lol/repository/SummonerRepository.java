package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.Summoner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SummonerRepository extends JpaRepository<Summoner, String> {
    @Query(value = "SELECT * FROM summoner s WHERE lower(replace(s.name, ' ', '')) = lower(replace(?1 , ' ', '')) collate utf8_bin AND s.platform = ?2 ",
            nativeQuery = true)
    Summoner findByNameAndPlatform(String name, String platform);
}
