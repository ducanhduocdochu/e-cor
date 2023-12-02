function padWithFs(inputString) {
    const maxLength = 24;
    const fsToAdd = maxLength - inputString.length;
    
    if (fsToAdd <= 0) {
      return inputString.slice(0, maxLength); // Nếu chuỗi đầu vào đã đủ dài, trả về nó
    } else {
      const fs = 'f'.repeat(fsToAdd); // Tạo chuỗi 'f' cần thêm
      return fs + inputString; // Đặt chuỗi 'f' phía trước chuỗi đầu vào
    }
  }

module.exports = {padWithFs}
  
  // Sử dụng hàm
//   const inputString = 'abc123'; // Thay thế bằng chuỗi đầu vào của bạn
//   const outputString = padWithFs(inputString);
  
//   console.log(outputString); // In chuỗi đầu ra có 24 ký tự với 'f' ở đầu (nếu cần)
  