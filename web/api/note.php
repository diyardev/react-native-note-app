<?php
include "../db.php";
$data = json_decode(file_get_contents("php://input"), true);
$URL = "https://diyar.net.tr/dnot/";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if (isset($data['islem']) && $data['islem'] === 'createNote') {
    $content = isset($data['content']) ? $data['content'] : null;
    $title = isset($data['title']) ? $data['title'] : null;
    $userId = isset($data['userId']) ? $data['userId'] : null;
    $date = date('d.m.Y H:i');
    $dateTime = strtotime(date('d.m.Y H:i'));

    // Kayıt Olma işlemleri
    if ($content && $userId && $title) {


        // Kullanıcıyı veritabanına Aktar
        $sorgu = $db->prepare("INSERT INTO notes SET
				content		= :content,
				title 		= :title,
				user 		= :user,
				created_date 		= :created_date,
				updated_date 		= :updated_date,
				dateTime 		= :dateTime");
        $Ekle = $sorgu->execute(array(
            'content' => $content,
            'title' => $title,
            'user' => $userId,
            'created_date' => $date,
            'updated_date' => $dateTime,
            'dateTime' => $dateTime
        ));
        if ($Ekle) {
            $last_id = $db->lastInsertId();
            $note = $db->query("SELECT * FROM notes WHERE id = '{$last_id}'")->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['note' => $note, 'status' => 'success', 'message' => 'Not başarıyla eklendi.']);
            die();
        } else {
            echo json_encode(['status' => 'danger', 'message' => 'Veritabanına kayıt yapılamadı. Lütfen sistem yöneticisi ile iletişime geçiniz.']);
            die();
        }
    } else {
        // Eksik parametreler
        echo json_encode(['status' => 'warning', 'msg' => 'Eksik parametreler']);
        die();
    }
}


if (isset($data['islem']) && $data['islem'] === 'getNotes') {
    $userQuery = "";
    if (isset($data["userId"]) && $data['userId']) {
        $userQuery = " WHERE user = " . $data['userId'] . " ";
    }
    $notes = $db->query("SELECT * FROM notes $userQuery ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['notes' => $notes, 'status' => 'success', 'message' => 'Not başarıyla listelendi.']);
    die();
}

if (isset($data['islem']) && $data['islem'] === 'deleteNote') {
    $noteId = $data['noteId'];
    $noteQuery = $db->prepare("DELETE FROM notes WHERE id = :id");
    $deletedNote = $noteQuery->execute(array('id' => $noteId));
    if ($deletedNote){
        echo json_encode(['status' => 'success', 'message' => 'Not başarıyla silindi.']);
        die();
    }else {
        echo json_encode(['status' => 'danger', 'message' => 'Hata oluştu. Not silinemedi.']);
        die();
    }
}


if (isset($data['islem']) && $data['islem'] === 'updateNote') {
    $noteId = $data['noteId'];
    $title = $data['title'];
    $content = $data['content'];
    $date = strtotime(date('d.m.Y H:i'));
    $sorgu = $db->prepare("UPDATE notes SET
				title = ?,
				content = ?,
				updated_date = ?
				WHERE id = ?");
    $guncelle = $sorgu->execute(array(
        $title,
        $content,
        $date,
        $noteId
    ));
    if ($guncelle) {
        echo json_encode(['status' => "success", 'message' => 'Not başarıyla güncellendi']);
        die();
    } else {
        echo json_encode(['status' => 'danger', 'msg' => 'Not güncellenirken bir hata oluştu.']);
        die();
    }

}

