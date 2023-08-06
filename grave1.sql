/*
 Navicat Premium Data Transfer

 Source Server         : 本地mysql
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : grave

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 02/08/2023 00:57:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `root` tinyint(1) DEFAULT NULL COMMENT '超级管理员 1-是 0-否',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名字',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '电话',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '备注',
  `grave_limit` int DEFAULT NULL COMMENT '可创建数量',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='管理员';

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` (`id`, `root`, `user_name`, `password`, `name`, `avatar`, `email`, `phone`, `remark`, `grave_limit`, `create_time`, `update_time`) VALUES (1, 1, 'admin', '123456', NULL, NULL, NULL, NULL, NULL, 0, '2023-07-28 21:47:15', '2023-07-28 21:47:15');
COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `admin_id` int DEFAULT NULL COMMENT '作者（管理员）',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '封面',
  `abstract` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '摘要',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `imgs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '图片集',
  `audio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '音频',
  `type` tinyint(1) DEFAULT NULL COMMENT '类型:1-文章 2-图文',
  `sort` int DEFAULT NULL COMMENT '排序',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示 1-是 0-否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='文章';

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for grave
-- ----------------------------
DROP TABLE IF EXISTS `grave`;
CREATE TABLE `grave` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `admin_id` int DEFAULT NULL COMMENT '管理员id',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '编码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名字',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '密码',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '封面',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '地址',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述（墓志铭）',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='墓碑表';

-- ----------------------------
-- Records of grave
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for grave_url
-- ----------------------------
DROP TABLE IF EXISTS `grave_url`;
CREATE TABLE `grave_url` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'url地址',
  `qr_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '二维码base64',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='生成的url';

-- ----------------------------
-- Records of grave_url
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for mate
-- ----------------------------
DROP TABLE IF EXISTS `mate`;
CREATE TABLE `mate` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名字',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别 1-男 0-女',
  `identity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '身份',
  `native` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '籍贯',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '简介',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `mate_id` int DEFAULT NULL COMMENT '配偶id',
  `birth_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '出生日期',
  `die_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '去世日期',
  `is_die` tinyint(1) DEFAULT NULL COMMENT '是否去世 1-是 0-否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='配偶表';

-- ----------------------------
-- Records of mate
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for media
-- ----------------------------
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `admin_id` int DEFAULT NULL COMMENT '作者（管理员）',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '封面',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'url地址',
  `abstract` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '摘要',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `type` tinyint(1) DEFAULT NULL COMMENT '类型:1-音频 2-视频',
  `sort` int DEFAULT NULL COMMENT '排序',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示 1-是 0-否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='文章';

-- ----------------------------
-- Records of media
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `pid` int DEFAULT NULL COMMENT '父id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名字',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别 1-男 0-女',
  `identity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '身份',
  `native` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '籍贯',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '简介',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `birth_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '出生日期',
  `die_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '去世日期',
  `is_die` tinyint(1) DEFAULT NULL COMMENT '是否去世 1-是 0-否',
  `is_master` tinyint(1) DEFAULT NULL COMMENT '是否墓主人 1-是 0-否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='人员表';

-- ----------------------------
-- Records of member
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for page
-- ----------------------------
DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `template_id` int DEFAULT NULL COMMENT '模板id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名字',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `readme` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '说明',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `is_active` tinyint(1) DEFAULT NULL COMMENT '是否应用 1-是 0-否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='页面表';

-- ----------------------------
-- Records of page
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for page_template
-- ----------------------------
DROP TABLE IF EXISTS `page_template`;
CREATE TABLE `page_template` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名字',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '封面',
  `readme` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '说明',
  `config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '配置详情',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'demo数据',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='页面模板';

-- ----------------------------
-- Records of page_template
-- ----------------------------
BEGIN;
INSERT INTO `page_template` (`id`, `name`, `desc`, `cover`, `readme`, `config`, `content`, `create_time`, `update_time`) VALUES (1, '基础模板', NULL, NULL, NULL, '[\n  {\n    \"name\": \"人物面板\",\n    \"component\": \"GraveMemberView\",\n    \"fields\": [\n      {\n        \"type\": \"RadioEditor\",\n        \"label\": \"是否包含配偶\",\n        \"field\": \"includeMate\",\n        \"defaultValue\": 0\n      }\n    ],\n    \"dataSource\": \"grave_home_member_data\"\n  },\n  {\n    \"name\": \"幻灯片\",\n    \"component\": \"GraveImgSwiper\",\n    \"fields\": [\n      {\n        \"type\": \"FileUploadEditor\",\n        \"label\": \"图片\",\n        \"field\": \"imgs\",\n        \"rules\": {\n          \"required\": true\n        },\n        \"attrs\": {\n          \"type\": \"img\",\n          \"multiple\": true\n        }\n      }\n    ],\n    \"dataSource\": \"grave_home_swiper_data\"\n  },\n  {\n    \"name\": \"墓志铭\",\n    \"component\": \"GraveDeatilView\",\n    \"fields\": [\n      {\n        \"type\": \"InputEditor\",\n        \"label\": \"墓志铭\",\n        \"field\": \"detail\",\n        \"defaultValue\": \"$model.Grave.detail\",\n        \"rules\": {\n          \"required\": true\n        },\n        \"attrs\": {\n          \"disabled\": true\n        }\n      }\n    ],\n    \"dataSource\": \"grave_home_detail_data\"\n  },\n  {\n    \"name\": \"图片位1\",\n    \"component\": \"GraveImgView\",\n    \"fields\": [\n      {\n        \"type\": \"FileUploadEditor\",\n        \"label\": \"图片\",\n        \"field\": \"img\",\n        \"attrs\": {\n          \"type\": \"img\",\n          \"multiple\": false\n        }\n      }\n    ],\n    \"dataSource\": \"grave_home_img1\"\n  }\n]\n', NULL, '2023-07-28 21:48:56', '2023-08-01 00:36:27');
COMMIT;

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `grave_id` int DEFAULT NULL COMMENT '墓碑id',
  `admin_id` int DEFAULT NULL COMMENT '作者（管理员）',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'url地址',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情',
  `sort` int DEFAULT NULL COMMENT '排序',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示 1-是 0-否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='图片';

-- ----------------------------
-- Records of photo
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
