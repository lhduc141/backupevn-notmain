export const PHONE_NUMBER_REG_EXP = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

/**Điều kiện mật khẩu: Ít nhất 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt, tối thiểu 10 ký tự */
export const PASSWORD_REG_EXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\-=/\\]).{10,}$/;
