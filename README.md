# react-native-note
dNot React Native Expo ile yazılan authenticated,Google Login ve Profil modülü bulunan bir not yönetim uygulamasıdır. sistemi bulunan. Birden fazla kişi sisteme kayıt olabilir ve notlarını ekleyebilir. Veritabanı web hosting'inde bulunuyor. PHP dosyalarına  api isteği atılıyor ve  PDO ile mysql'e veriler yazılıyor, okunuyor. 

console.firebase.google.com  Adresinden firebase projenize Google Signin methodu eklemeniz gerekiyor. \screens\LoginScreen.js  dosyasında webClientId karşısına Signin Methods ->  Google -> Web SDK configuration tab altındaki id yi eklemeniz gerekiyor.


\util\auth.js   , \util\requests.js  dosyalarına API_URL değişkenlerine web api dosyalarınızın bulunduğu klasörü yolunu eklemeniz gerekmektedir. Örn : https://diyar.net.tr/dnot/api




https://github.com/diyardev/react-native-note-app/assets/30293391/8b31fc5e-cc57-492a-aff6-93db704a0566

