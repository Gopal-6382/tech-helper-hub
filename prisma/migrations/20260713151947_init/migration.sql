/*
  Warnings:

  - You are about to drop the column `isSolution` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `parentCommentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeLink` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `requestType` on the `service_requests` table. All the data in the column will be lost.
  - You are about to drop the column `urgency` on the `service_requests` table. All the data in the column will be lost.
  - You are about to drop the `comment_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saved_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."comment_likes" DROP CONSTRAINT "comment_likes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment_likes" DROP CONSTRAINT "comment_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."follows" DROP CONSTRAINT "follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."follows" DROP CONSTRAINT "follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."post_media" DROP CONSTRAINT "post_media_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."post_tags" DROP CONSTRAINT "post_tags_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."post_tags" DROP CONSTRAINT "post_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."saved_posts" DROP CONSTRAINT "saved_posts_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."saved_posts" DROP CONSTRAINT "saved_posts_userId_fkey";

-- DropIndex
DROP INDEX "public"."comments_parentCommentId_idx";

-- AlterTable
ALTER TABLE "public"."comments" DROP COLUMN "isSolution",
DROP COLUMN "parentCommentId",
DROP COLUMN "updatedAt",
DROP COLUMN "youtubeLink";

-- AlterTable
ALTER TABLE "public"."conversations" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."messages" DROP COLUMN "mediaType",
DROP COLUMN "mediaUrl";

-- AlterTable
ALTER TABLE "public"."problem_posts" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."service_requests" DROP COLUMN "requestType",
DROP COLUMN "urgency";

-- DropTable
DROP TABLE "public"."comment_likes";

-- DropTable
DROP TABLE "public"."follows";

-- DropTable
DROP TABLE "public"."post_media";

-- DropTable
DROP TABLE "public"."post_tags";

-- DropTable
DROP TABLE "public"."reports";

-- DropTable
DROP TABLE "public"."saved_posts";

-- DropTable
DROP TABLE "public"."tags";

-- DropEnum
DROP TYPE "public"."MediaType";

-- DropEnum
DROP TYPE "public"."ReportReason";

-- DropEnum
DROP TYPE "public"."ReportStatus";

-- DropEnum
DROP TYPE "public"."RequestType";

-- DropEnum
DROP TYPE "public"."Urgency";
