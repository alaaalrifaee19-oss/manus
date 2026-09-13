CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`authorName` varchar(160) NOT NULL,
	`imageUrl` text NOT NULL,
	`categoryName` varchar(120) NOT NULL,
	`readTimeMinutes` int NOT NULL DEFAULT 5,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(120) NOT NULL,
	`description` text,
	`icon` varchar(64),
	`orderIndex` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`certificateCode` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`studentName` varchar(160) NOT NULL,
	`courseTitle` varchar(255) NOT NULL,
	`grade` varchar(64) DEFAULT 'ممتاز',
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	`instructorSignatureName` varchar(160) DEFAULT 'أ. هدى عابدين',
	`status` enum('valid','revoked') NOT NULL DEFAULT 'valid',
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_certificateCode_unique` UNIQUE(`certificateCode`)
);
--> statement-breakpoint
CREATE TABLE `contactMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','replied') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`categoryId` int NOT NULL,
	`instructorId` int NOT NULL,
	`badgeText` varchar(64),
	`shortDescription` text NOT NULL,
	`fullDescription` text NOT NULL,
	`imageUrl` text NOT NULL,
	`price` int NOT NULL DEFAULT 0,
	`originalPrice` int DEFAULT 0,
	`isFree` boolean NOT NULL DEFAULT false,
	`level` enum('مبتدئ','متوسط','متقدم','جميع المستويات') NOT NULL DEFAULT 'جميع المستويات',
	`durationText` varchar(120) NOT NULL,
	`lessonCount` int NOT NULL DEFAULT 12,
	`studentCount` int NOT NULL DEFAULT 0,
	`rating` varchar(10) NOT NULL DEFAULT '5.0',
	`reviewCount` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`ageGroup` varchar(80) DEFAULT 'الأطفال واليافعين',
	`language` varchar(60) DEFAULT 'العربية',
	`requirements` text,
	`learningOutcomes` text,
	`targetAudience` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`progressPercentage` int NOT NULL DEFAULT 0,
	`status` enum('active','completed','paused') NOT NULL DEFAULT 'active',
	`lastAccessedAt` timestamp NOT NULL DEFAULT (now()),
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` varchar(120) NOT NULL DEFAULT 'عام',
	`orderIndex` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `instructors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`name` varchar(160) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`title` varchar(255) NOT NULL,
	`bio` text NOT NULL,
	`detailedBio` text,
	`qualifications` text,
	`credentials` text,
	`avatarUrl` text NOT NULL,
	`experienceYears` int NOT NULL DEFAULT 5,
	`studentsTrained` int NOT NULL DEFAULT 100,
	`trainersGraduated` int NOT NULL DEFAULT 20,
	`location` varchar(160),
	`email` varchar(320),
	`phone` varchar(64),
	`rating` varchar(10) NOT NULL DEFAULT '4.9',
	`reviewCount` int NOT NULL DEFAULT 45,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `instructors_id` PRIMARY KEY(`id`),
	CONSTRAINT `instructors_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `lessonProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`lessonId` int NOT NULL,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`studentNotes` text,
	CONSTRAINT `lessonProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleId` int NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text,
	`videoUrl` text,
	`durationMinutes` int NOT NULL DEFAULT 20,
	`orderIndex` int NOT NULL DEFAULT 0,
	`isFreePreview` boolean NOT NULL DEFAULT false,
	`resourcesJson` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`orderIndex` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`link` varchar(255),
	`type` enum('course','exam','certificate','system','announcement') NOT NULL DEFAULT 'system',
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quizId` int NOT NULL,
	`questionText` text NOT NULL,
	`type` enum('single_choice','multiple_choice','true_false') NOT NULL DEFAULT 'single_choice',
	`optionsJson` text NOT NULL,
	`correctAnswerJson` text NOT NULL,
	`explanation` text,
	`orderIndex` int NOT NULL DEFAULT 0,
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizId` int NOT NULL,
	`courseId` int NOT NULL,
	`score` int NOT NULL,
	`isPassed` boolean NOT NULL,
	`answersJson` text NOT NULL,
	`feedback` text,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quizSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`lessonId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`durationMinutes` int DEFAULT 20,
	`passingScore` int NOT NULL DEFAULT 70,
	`isFinalExam` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int,
	`userId` int,
	`authorName` varchar(160) NOT NULL,
	`authorRole` varchar(160) NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`comment` text NOT NULL,
	`isApproved` boolean NOT NULL DEFAULT true,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(120) NOT NULL,
	`value` text NOT NULL,
	`description` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','student','instructor','admin') NOT NULL DEFAULT 'student';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `country` varchar(120);--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(120);