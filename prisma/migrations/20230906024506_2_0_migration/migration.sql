/*
  Warnings:

  - A unique constraint covering the columns `[url_id]` on the table `UrlAnalytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UrlAnalytics_url_id_key` ON `UrlAnalytics`(`url_id`);
