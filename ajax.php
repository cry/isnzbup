<?php

header("Content-type: application/json");
header("X-Application-Description: Will cache up/down data for every ten mins.");

$cache = json_decode(file_get_contents('cache.json'), TRUE);
$runtime = time();

header("X-Application-Cache-Updated: " . $cache['updated']);
header("X-Application-Cache-Threshold: " . ($runtime - 600));

if ($cache['updated'] > ($runtime - 600)) {
    header("X-Application-Cache: Hit");
    echo json_encode($cache);

    exit;
}

function check($domain, $port){
    @$file = fsockopen ($domain, $port, $errno, $errstr, 1); //shh i dont need any output here
    return $file;
}

$sites = json_decode(file_get_contents('sites.json'), TRUE);
$res = array(
    "updated" => $runtime
);

foreach ($sites as $site) {
    if (check($site[0], $site[1])) {
        $res[$site[0]] = true;
    } else {
        $res[$site[0]] = false;
    }
}

file_put_contents('cache.json', json_encode($res));

echo json_encode($res);