/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : bookstore

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 04/08/2020 17:01:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bills
-- ----------------------------
DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name_customer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `birthday_customer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `discount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `book_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `total_price` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bills
-- ----------------------------
INSERT INTO `bills` VALUES (1, '006', 'Lại Hoàng Việt', '2020-08-13 00:00:00', '2020-07-30 10:20:27', NULL, 'Trịnh Thị Hương', '20', '<p>Kh&aacute;ch h&agrave;ng th&acirc;n thiết</p>\r\n', '1', '50000', '40000');
INSERT INTO `bills` VALUES (2, '052', 'Phạm Thúy Nga', '2020-08-14 00:00:00', '2020-07-29 13:51:36', NULL, 'Phạm Thùy Trang', '10', '', '3,4', '215000', '193500');
INSERT INTO `bills` VALUES (3, '053', 'Đặng Phương Thúy', '2020-08-05 00:00:00', '2020-08-01 13:52:11', NULL, 'Phạm Thùy Trang', '0', '', '1,2,3,5,7', '430000', '430000');
INSERT INTO `bills` VALUES (4, '063', 'Nguyễn Thúy Hạnh', '2020-08-13 00:00:00', '2020-08-01 13:54:13', NULL, 'Phạm Thùy Trang', '0', '', '1,2,3,5', '280000', '280000');
INSERT INTO `bills` VALUES (5, '096', 'Nguyễn Hải Hà', '2020-08-04 13:59:13', '2020-08-02 13:59:13', NULL, 'Phạm Thùy Trang', '0', '', '1,2,3,5,6', '400000', '400000');
INSERT INTO `bills` VALUES (7, '057', 'Nguyễn Ngọc Đức', '2002-08-04 00:00:00', '2020-08-04 14:16:55', NULL, 'Phạm Thùy Trang', '10', '<p>Ng&agrave;y sinh nhật kh&aacute;ch h&agrave;ng</p>\r\n', '1,11,12,13', '324000', '291600');
INSERT INTO `bills` VALUES (8, '074', 'Nguyễn Hồng Nhung', '2020-08-04 14:17:28', '2020-08-04 14:17:28', NULL, 'Phạm Thùy Trang', '0', '', '10', '105000', '105000');
INSERT INTO `bills` VALUES (9, '075', 'Nguyễn Văn Khánh', '2020-08-04 14:18:19', '2020-08-04 14:18:19', NULL, 'Phạm Thùy Trang', '0', '', '2', '10000', '10000');
INSERT INTO `bills` VALUES (10, '076', 'Hoàng Nguyễn', '2020-08-04 15:10:30', '2020-08-04 15:10:30', NULL, 'Phạm Thùy Trang', '0', '', '11', '109000', '109000');
INSERT INTO `bills` VALUES (11, '080', 'Nguyễn Võ Sỹ', '2020-08-04 15:55:07', '2020-08-04 15:55:07', NULL, 'Đặng Thế Hưng', '0', '', '3,7,9,12', '395000', '395000');
INSERT INTO `bills` VALUES (12, '081', 'Nguyễn Thị Thập', '2020-08-04 15:55:34', '2020-08-04 15:55:34', NULL, 'Đặng Thế Hưng', '0', '', '6,9', '205000', '205000');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã sách',
  `name` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Tên sách',
  `group_id` int(11) NULL DEFAULT NULL COMMENT 'ID nhóm sách',
  `class_id` tinyint(1) NULL DEFAULT NULL COMMENT 'Lớp (1-12)',
  `attachs` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'File hdsd',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày tạo',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày sửa',
  `created_by` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Người tạo',
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_book` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `book` VALUES (1, '001', 'Khoa Học - Công Nghệ', 1, NULL, 'Tài liệu tham khảo.docx', '2020-08-03 18:50:53', '2020-08-04 14:16:55', 'Trịnh Thị Hương', '50000', '10');
INSERT INTO `book` VALUES (2, '002', '10 vạn câu hỏi vì sao', 2, NULL, '', '2020-08-03 19:13:31', '2020-08-04 14:18:18', 'Trịnh Thị Hương', '10000', '11');
INSERT INTO `book` VALUES (3, '003', 'Bộ sách văn học lớp 9', 3, NULL, 'Tài liệu tham khảo.docx', '2020-08-03 19:14:43', '2020-08-04 15:55:07', 'Trịnh Thị Hương', '105000', '85');
INSERT INTO `book` VALUES (4, '004', 'Bộ sách văn học lớp 4', 3, NULL, 'Tài liệu tham khảo.docx', '2020-08-03 19:14:43', '2020-08-04 13:51:36', 'Trịnh Thị Hương', '110000', '79');
INSERT INTO `book` VALUES (5, '005', 'Bộ sách văn học lớp 5', 3, NULL, 'Tài liệu tham khảo.docx', '2020-08-03 19:14:43', '2020-08-04 13:59:13', 'Trịnh Thị Hương', '115000', '62');
INSERT INTO `book` VALUES (6, '006', 'Bộ sách văn học lớp 6', 3, NULL, 'Tài liệu tham khảo.docx', '2020-08-03 19:14:43', '2020-08-04 15:55:34', 'Trịnh Thị Hương', '120000', '23');
INSERT INTO `book` VALUES (7, '007', 'Bộ sách văn học lớp 7', 3, NULL, 'Tài liệu tham khảo.docx', '2020-08-03 19:14:43', '2020-08-04 15:55:07', 'Trịnh Thị Hương', '150000', '13');
INSERT INTO `book` VALUES (9, '008', 'Dấu Chân Trên Cát ', 4, NULL, 'Tài liệu tham khảo.docx', '2020-08-04 14:09:18', '2020-08-04 15:55:34', 'Phạm Thùy Trang', '85000', '18');
INSERT INTO `book` VALUES (10, '009', 'Mắt Biếc (Tái Bản 2019)', 4, NULL, '', '2020-08-04 14:10:10', '2020-08-04 14:17:28', 'Phạm Thùy Trang', '105000', '0');
INSERT INTO `book` VALUES (11, '010', 'Họa Mi', 2, NULL, '', '2020-08-04 14:10:43', '2020-08-04 15:10:29', 'Phạm Thùy Trang', '109000', '22');
INSERT INTO `book` VALUES (12, '011', 'Nhà Giả Kim (Tái Bản 2017) ', 7, NULL, '', '2020-08-04 14:12:03', '2020-08-04 15:55:07', 'Phạm Thùy Trang', '55000', '0');
INSERT INTO `book` VALUES (13, '012', '10 Kỹ năng bán hàng', 6, NULL, '', '2020-08-04 14:12:42', '2020-08-04 14:16:55', 'Phạm Thùy Trang', '110000', '0');

-- ----------------------------
-- Table structure for book_group
-- ----------------------------
DROP TABLE IF EXISTS `book_group`;
CREATE TABLE `book_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã nhóm',
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Tên nhóm',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày tạo',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày sửa',
  `created_by` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Người tạo',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_group
-- ----------------------------
INSERT INTO `book_group` VALUES (1, 'H1', 'Khoa Học', '2020-07-08 13:48:37', NULL, NULL);
INSERT INTO `book_group` VALUES (2, 'H2', 'Giải Trí', '2020-07-08 13:49:04', NULL, NULL);
INSERT INTO `book_group` VALUES (3, 'H3', 'Văn Học', '2020-07-08 13:49:18', NULL, NULL);
INSERT INTO `book_group` VALUES (4, 'T1', 'Tiểu Thuyết', '2020-08-04 14:04:26', NULL, NULL);
INSERT INTO `book_group` VALUES (5, 'N1', 'Ngôn Tình', '2020-08-04 14:05:04', NULL, NULL);
INSERT INTO `book_group` VALUES (6, 'M1', 'Marketing - Bán Hàng', '2020-08-04 14:06:12', NULL, NULL);
INSERT INTO `book_group` VALUES (7, 'T2', 'Tâm Lý', '2020-08-04 14:06:38', NULL, NULL);

-- ----------------------------
-- Table structure for book_teacher
-- ----------------------------
DROP TABLE IF EXISTS `book_teacher`;
CREATE TABLE `book_teacher`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacher_code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for book_temp_mail
-- ----------------------------
DROP TABLE IF EXISTS `book_temp_mail`;
CREATE TABLE `book_temp_mail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã sách',
  `title` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Tiêu đề thư',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'Nội dung thư',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_temp_mail
-- ----------------------------
INSERT INTO `book_temp_mail` VALUES (1, '001', NULL, '<p>Học tốt 2021</p>\r\n', '2020-08-03 18:50:53', NULL);
INSERT INTO `book_temp_mail` VALUES (2, '002', NULL, '', '2020-08-03 19:13:31', NULL);
INSERT INTO `book_temp_mail` VALUES (3, '003', NULL, '', '2020-08-03 19:14:43', NULL);
INSERT INTO `book_temp_mail` VALUES (4, '008', NULL, '', '2020-08-04 14:09:18', NULL);
INSERT INTO `book_temp_mail` VALUES (5, '009', NULL, '', '2020-08-04 14:10:10', NULL);
INSERT INTO `book_temp_mail` VALUES (6, '010', NULL, '', '2020-08-04 14:10:43', NULL);
INSERT INTO `book_temp_mail` VALUES (7, '011', NULL, '', '2020-08-04 14:12:03', NULL);
INSERT INTO `book_temp_mail` VALUES (8, '012', NULL, '', '2020-08-04 14:12:42', NULL);

-- ----------------------------
-- Table structure for company_orders
-- ----------------------------
DROP TABLE IF EXISTS `company_orders`;
CREATE TABLE `company_orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `linkweb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company_orders
-- ----------------------------
INSERT INTO `company_orders` VALUES (1, 'NXB phụ nữ Việt Nam', 'Hồ Tây - Hà Nội', 'https://www.fahasa.com/van-la-mua-ha-nhung-khong-con-chung-ta.html');
INSERT INTO `company_orders` VALUES (2, 'NXB Tiền Phong', 'Đại Từ - Hoàng Mai - Hà Nội', 'https://www.fahasa.com/van-la-mua-ha-nhung-khong-con-chung-ta.html');
INSERT INTO `company_orders` VALUES (3, 'NXB Thiếu Nhi ', 'Quận 1 - Hồ Chi Minh', 'https://www.fahasa.com/van-la-mua-ha-nhung-khong-con-chung-ta.html');
INSERT INTO `company_orders` VALUES (4, 'Công Ty TNHH Hồng Hà', 'Lê Đại Hành - Hai Bà Trưng - Hà Nội', 'https://www.fahasa.com/van-la-mua-ha-nhung-khong-con-chung-ta.html');
INSERT INTO `company_orders` VALUES (5, 'Công Ty TNHH Hải Tiến', 'Quận 5 - TP. Hồ Chí Minh', 'https://www.fahasa.com/van-la-mua-ha-nhung-khong-con-chung-ta.html');

-- ----------------------------
-- Table structure for history_republish
-- ----------------------------
DROP TABLE IF EXISTS `history_republish`;
CREATE TABLE `history_republish`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã sách',
  `message` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mô tả lịch sử',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `book_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `total_book` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` float(100, 0) NULL DEFAULT NULL,
  `total_price` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, '011', 'Đơn hàng lần 1 cho tháng 7', '3', '2020-08-04 10:35:21', '2020-08-04 10:35:21', 'Trịnh Thị Hương', '1', '4', '25', 110000, '2750000');
INSERT INTO `orders` VALUES (2, '096', 'Đơn hàng lần 2 cho tháng 5', '2', '2020-08-04 10:36:10', '2020-08-04 10:36:10', 'Trịnh Thị Hương', '3', '2', '16', 10000, '160000');
INSERT INTO `orders` VALUES (3, '058', 'Đơn hàng lần 3 cho tháng 5', '5', '2020-08-04 10:36:56', '2020-08-04 10:36:56', 'Trịnh Thị Hương', '2', '5', '25', 115000, '2875000');

-- ----------------------------
-- Table structure for republish
-- ----------------------------
DROP TABLE IF EXISTS `republish`;
CREATE TABLE `republish`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã sách',
  `code_item` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã sách tái bản',
  `republish` int(11) NULL DEFAULT NULL COMMENT 'Lần tái bản',
  `status` tinyint(1) NULL DEFAULT 0 COMMENT 'Trạng thái sử dụng',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sms_book
-- ----------------------------
DROP TABLE IF EXISTS `sms_book`;
CREATE TABLE `sms_book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Số điện thoại đăng ký',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Email đăng ký',
  `sms_num` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Đầu số gửi tin',
  `code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã sách tái bản',
  `publish` int(1) NULL DEFAULT 0 COMMENT 'Trạng thái',
  `send_mail` int(11) NULL DEFAULT 0 COMMENT 'Số lần gửi mail',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày tạo',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày sửa',
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'Nội dung',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES (1, 'Vừa mới tạo');
INSERT INTO `status` VALUES (2, 'Đang giao hàng');
INSERT INTO `status` VALUES (3, 'Đã nhận được hàng');
INSERT INTO `status` VALUES (4, 'Đã hủy');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã giáo viên',
  `fullname` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Tên đầy đủ',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Số điện thoại',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Email',
  `address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Địa chỉ',
  `facebook` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Facebook',
  `youtube_chanel` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Kênh youtube',
  `publish` tinyint(1) NULL DEFAULT 0 COMMENT 'Trạng thái',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày tạo',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày sửa',
  `created_by` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Người tạo',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, 'huongtt', 'Trịnh Thị Hương', '0967413184', 'trinhhuong29071999@gmail.com', 'Số 46 Vương Thừa Vũ', '', '', 0, '2020-07-08 13:35:23', NULL, NULL);
INSERT INTO `teacher` VALUES (2, 'trangpt', 'Phạm Thùy Trang', '0967413188', 'trangpt@gmail.com', 'Trương Định - Hà Nội', '', '', 0, '2020-08-04 10:38:32', NULL, 'Trịnh Thị Hương');
INSERT INTO `teacher` VALUES (3, 'vietlh', 'Lại Hoàng Việt', '0967413189', 'laihoangviet@gmail.com', 'Nguyễn Thị Định - Hà Nội', '', '', 0, '2020-08-04 10:39:55', NULL, 'Trịnh Thị Hương');
INSERT INTO `teacher` VALUES (4, 'hungdt', 'Đặng Thế Hưng', '0967413188', 'hungdt@gmail.com', 'số 45 Hoàng Hoa Thám ', '', '', 0, '2020-08-04 10:40:56', NULL, 'Trịnh Thị Hương');
INSERT INTO `teacher` VALUES (5, 'quynhdn', 'Dương Ngọc Quỳnh', '0968751348', 'quynhdn@gmail.com', '345 Cầu Giấy - Hn', '', '', 0, '2020-08-04 10:41:56', NULL, 'Trịnh Thị Hương');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mã nhân viên',
  `fullname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Họ và tên',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Email',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Số điện thoại',
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Mật khẩu',
  `role` tinyint(4) NULL DEFAULT 0 COMMENT 'Vai trò',
  `position` tinyint(4) NULL DEFAULT 0 COMMENT 'Chức vụ',
  `department` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Phòng ban',
  `publish` tinyint(4) NULL DEFAULT 1 COMMENT 'Trạng thái',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày tạo',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Ngày sửa',
  `created_by` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Người tạo',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'huongtt', 'Trịnh Thị Hương', 'trinhhuong29071999@gmail.com', '0967413184', 'Số 46 Vương Thừa Vũ 2', '$2y$08$akMrSFExR24zc0NVV1UyT.7LAof4nsQS7aYg5BuTum6nL2EUewKq.', 0, 0, NULL, 1, '2020-07-08 13:35:23', '2020-07-09 13:54:19', NULL);
INSERT INTO `users` VALUES (2, 'trangpt', 'Phạm Thùy Trang', 'trangpt@gmail.com', '0967413188', 'Trương Định - Hà Nội', '$2y$08$RnozZGk5UUpqeXMyd1A5eOfRELIUXQbf3328W1MGppl5BPqiV5X4S', 0, 0, NULL, 1, '2020-08-04 10:38:32', NULL, 'Trịnh Thị Hương');
INSERT INTO `users` VALUES (3, 'vietlh', 'Lại Hoàng Việt', 'laihoangviet@gmail.com', '0967413189', 'Nguyễn Thị Định - Hà Nội', '$2y$08$SGFjT1J1WnUxK1JaV3YweOgA2MpbY1GurHnCU1QuL613hlqLX3qYe', 1, 0, NULL, 1, '2020-08-04 10:39:54', NULL, 'Trịnh Thị Hương');
INSERT INTO `users` VALUES (4, 'hungdt', 'Đặng Thế Hưng', 'hungdt@gmail.com', '0967413188', 'số 45 Hoàng Hoa Thám ', '$2y$08$aWdvYVlad3hBOXdLcWVSVO1HRzI15egags37w9VcfMb4V/iOen4OS', 1, 0, NULL, 1, '2020-08-04 10:40:56', NULL, 'Trịnh Thị Hương');
INSERT INTO `users` VALUES (5, 'quynhdn', 'Dương Ngọc Quỳnh', 'quynhdn@gmail.com', '0968751348', '345 Cầu Giấy - Hn', '$2y$08$Q1BidXV6WXJpYVQ4VjZzceYW1/yczP4epRtQzEJBWEgJjAC60b7Ea', 1, 0, NULL, 1, '2020-08-04 10:41:56', NULL, 'Trịnh Thị Hương');

SET FOREIGN_KEY_CHECKS = 1;
