package com.github.lbovolini.lol.controller;

import com.github.lbovolini.lol.service.SummonerService;
import net.rithms.riot.api.endpoints.summoner.dto.Summoner;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/summoner")
public class SummonerController {

    private final SummonerService summonerService;

    public SummonerController(SummonerService summonerService) {
        this.summonerService = summonerService;
    }

    @GetMapping(value = "/{name}/{platform}/details.json", produces = MediaType.APPLICATION_JSON_VALUE)
    Summoner byNameAndPlatform(@PathVariable String name, @PathVariable String platform) {
        return summonerService.findByNameAndPlatform(name, platform);
    }
}
