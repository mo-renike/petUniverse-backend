-- CreateTable
CREATE TABLE `vet_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `years_experience` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `phoneNumber` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `availability` JSON NULL,
    `bio` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vet_profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vet_profiles` ADD CONSTRAINT `vet_profiles_id_fkey` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
