package com.github.lbovolini.lol.util;

import net.rithms.riot.constant.Platform;

import java.util.HashMap;
import java.util.Map;

public class Region {
    static Map<String, Platform> regionMap = new HashMap<>(10);

    static {
        regionMap.put("BR", Platform.BR);
        regionMap.put("EUNE", Platform.EUNE);
        regionMap.put("EUW", Platform.EUW);
        regionMap.put("JP", Platform.JP);
        regionMap.put("KR", Platform.KR);
        regionMap.put("LAN", Platform.LAN);
        regionMap.put("LAS", Platform.LAS);
        regionMap.put("NA", Platform.NA);
        regionMap.put("OCE", Platform.OCE);
        regionMap.put("TR", Platform.TR);
        regionMap.put("RU", Platform.RU);
    }

    public static Platform get(String region) {
        return regionMap.get(region.toUpperCase());
    }
}