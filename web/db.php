<?php


try {
    $db = new PDO("mysql:host=localhost;dbname=VERİTABANIADI;charset=utf8", 'VERİTABANI_KULLANICI_ADI', 'VERİTABANI_ŞİFRE');
} catch (PDOExceptition $e) {
    echo $e->getMessage();
}

date_default_timezone_set('Europe/Istanbul');


