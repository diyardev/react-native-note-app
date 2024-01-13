import moment from "moment";
import "moment/locale/tr";
moment.locale("tr");

export function formatUpdateTimestamp(updatedDate) {
  const unixTimestamp = updatedDate; // Saniye cinsinden bir tarih
  const tarih = moment.unix(unixTimestamp);
  const simdikiTarih = moment();
  const fark = moment.duration(simdikiTarih.diff(tarih));

  // Farkı saniye cinsinden al
  const saniyeFarki = fark.asSeconds();

  let sonuc;

  if (saniyeFarki < 60) {
    // 1 saat içinde ise dakika kullan
    sonuc = `Şimdi Güncellendi`;
  } else if (saniyeFarki < 3600) {
    // 1 saat içinde ise dakika kullan
    sonuc = `${Math.floor(saniyeFarki / 60)} dakika önce güncellendi`;
  } else if (saniyeFarki < 86400) {
    // 24 saat içinde ise saat kullan
    sonuc = `${Math.floor(saniyeFarki / 3600)} saat önce güncellendi`;
  } else if (saniyeFarki < 2678400) {
    // 1 ay içinde ise gün kullan
    sonuc = `${Math.floor(saniyeFarki / 86400)} gün önce güncellendi`;
  } else if (saniyeFarki < 31536000) {
    // 1 yıl içinde ise ay kullan
    sonuc = `${Math.floor(saniyeFarki / 86400)} ay önce güncellendi`;
  } else {
    // Diğer durumlar için tarihi direkt göster
    sonuc = `${tarih.format("YYYY-MM-DD")} tarihinde güncellendi`;
  }

  return sonuc;
}

export function formatCreateTimestamp(createDate) {
  const unixTimestamp = createDate; // Saniye cinsinden bir tarih
  const tarih = moment.unix(unixTimestamp);
  const simdikiTarih = moment();
  const fark = moment.duration(simdikiTarih.diff(tarih));

  // Farkı saniye cinsinden al
  const saniyeFarki = fark.asSeconds();

  let sonuc;

  if (saniyeFarki < 60) {
    // 1 saat içinde ise dakika kullan
    sonuc = `Şimdi Oluşturuldu`;
  } else if (saniyeFarki < 3600) {
    // 1 saat içinde ise dakika kullan
    sonuc = `${Math.floor(saniyeFarki / 60)} dakika önce oluşturuldu`;
  } else if (saniyeFarki < 86400) {
    // 24 saat içinde ise saat kullan
    sonuc = `${Math.floor(saniyeFarki / 3600)} saat önce oluşturuldu`;
  } else if (saniyeFarki < 2678400) {
    // 1 ay içinde ise gün kullan
    sonuc = `${Math.floor(saniyeFarki / 86400)} gün önce oluşturuldu`;
  } else if (saniyeFarki < 31536000) {
    // 1 yıl içinde ise ay kullan
    sonuc = `${Math.floor(saniyeFarki / 86400)} ay önce oluşturuldu`;
  } else {
    // Diğer durumlar için tarihi direkt göster
    sonuc = `${tarih.format("YYYY-MM-DD")} tarihinde oluşturuldu`;
  }

  return sonuc;
}
