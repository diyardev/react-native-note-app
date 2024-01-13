<?php
include "../db.php";
$data = json_decode(file_get_contents("php://input"), true);
$URL = "https://diyar.net.tr/dnot/";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($data['islem']) && $data['islem'] === 'updateUser') {
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $userId = $data['userId'];

    $sorgu = $db->prepare("UPDATE users SET
				name = ?,
				email = ?,
				phone = ?
				WHERE id = ?");
    $guncelle = $sorgu->execute(array(
        $name,
        $email,
        $phone,
        $userId
    ));

    $user = $db->query("SELECT * FROM users WHERE id = '{$userId}'")->fetch(PDO::FETCH_ASSOC);

    if ($guncelle) {
        echo json_encode(['status' => "success", 'message' => 'Bilgileriniz başarıyla güncellendi!', 'user' => $user]);
        die();
    } else {
        echo json_encode(['status' => 'danger', 'msg' => 'Resim yüklenirken bir hata oluştu.']);
        die();
    }
}


if (isset($_FILES['profileImage'])) {
    $imageName = time() . $_FILES['profileImage']['name'];
    $targetPath = "api/profiles/" . $imageName;


    if (move_uploaded_file($_FILES['profileImage']['tmp_name'], "./profiles/" . $imageName)) {
        $user = $db->query("SELECT * FROM users WHERE id = '{$_POST['userId']}'")->fetch(PDO::FETCH_ASSOC);
        unlink("./profiles/" . explode('/', $user['photo'])[count(explode('/', $user['photo'])) - 1]);
        $sorgu = $db->prepare("UPDATE users SET
				photo = ?
				WHERE id = ?");
        $guncelle = $sorgu->execute(array(
            $URL . $targetPath,
            $_POST['userId']
        ));

        $user = $db->query("SELECT * FROM users WHERE id = '{$_POST['userId']}'")->fetch(PDO::FETCH_ASSOC);

        if ($guncelle) {
            echo json_encode(['status' => "success", 'message' => 'Resim başarıyla yüklendi', 'user' => $user]);
            die();
        } else {
            echo json_encode(['status' => 'danger', 'msg' => 'Resim yüklenirken bir hata oluştu.']);
            die();
        }

    } else {
        echo json_encode(['status' => "danger", 'message' => 'Resim yüklenirken bir hata oluştu']);
    }
    die();
}


if (isset($_GET['islem']) && $_GET['islem'] == 'getUsers') {
    $users = $db->query("SELECT * FROM users")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    die();
}


if (isset($data['islem']) && $data['islem'] === 'getUser') {
    $email = isset($data['email']) ? $data['email'] : null;
    if ($email) {
        // Kullanıcıyı veritabanından al
        $user = $db->query("SELECT * FROM users WHERE email = '{$email}'")->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            echo json_encode($user);
            die();
        } else {
            echo 0;
            die();
        }
    } else {
        // Eksik parametreler
        echo json_encode(['status' => 'warning', 'msg' => 'Eksik parametreler']);
        die();
    }
}


if (isset($data['islem']) && $data['islem'] === 'login') {
    $email = isset($data['email']) ? $data['email'] : null;
    $password = isset($data['password']) ? $data['password'] : null;
    // Giriş işlemleri
    if ($email && $password) {
        // Kullanıcıyı veritabanından al
        $user = $db->query("SELECT * FROM users WHERE email = '{$email}'")->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            if ($password == $user['password']) {
                echo json_encode(['status' => 'success', 'msg' => 'Başarılı!', 'user' => $user]);
                die();
            } else {
                echo json_encode(['status' => 'danger', 'msg' => 'Şifre yanlış']);
                die();
            }
        } else {
            echo json_encode(['status' => 'danger', 'msg' => 'Kullanıcı bulunamadı..']);
            die();
        }
    } else {
        // Eksik parametreler
        echo json_encode(['status' => 'warning', 'msg' => 'Eksik parametreler']);
        die();
    }
}


if (isset($data['islem']) && $data['islem'] === 'signup') {
    $email = isset($data['email']) ? $data['email'] : null;
    $name = isset($data['name']) ? $data['name'] : null;
    $phone = isset($data['phone']) ? $data['phone'] : null;
    $photo = isset($data['photo']) ? $data['photo'] : null;
    $password = isset($data['password']) ? $data['password'] : null;
    // Kayıt Olma işlemleri
    if ($email && $password && $name) {

        $userCheck = $db->query("SELECT * FROM users WHERE email = '{$email}'")->fetch(PDO::FETCH_ASSOC);
        if ($userCheck) {
            echo json_encode(['status' => 'warning', 'msg' => 'Girdiğiniz e-posta adresi zaten sisteme kayıtlı. Giriş yapmayı deneyebilirisiniz..']);
            die();
        }

        // Kullanıcıyı veritabanına Aktar
        $sorgu = $db->prepare("INSERT INTO users SET
				name		= :name,
				email 		= :email,
				photo 		= :photo,
				phone 		= :phone,
				password 	= :password");
        $Ekle = $sorgu->execute(array(
            'name' => $name,
            'email' => $email,
            'photo' => $photo,
            'phone' => $phone,
            'password' => $password
        ));
        if ($Ekle) {
            $last_id = $db->lastInsertId();
            $user = $db->query("SELECT * FROM users WHERE id = '{$last_id}'")->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['user' => $user, 'status' => 'success', 'msg' => 'Kayıt oluşturuldu. Başarıyla giriş yapabilirsiniz..']);
            die();
        } else {
            echo json_encode(['status' => 'danger', 'msg' => 'Veritabanına kayıt yapılamadı. Lütfen sistem yöneticisi ile iletişime geçiniz.']);
            die();
        }
    } else {
        // Eksik parametreler
        echo json_encode(['status' => 'warning', 'msg' => 'Eksik parametreler']);
        die();
    }
}




