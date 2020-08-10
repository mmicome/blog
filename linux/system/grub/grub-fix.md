fdisk -l

mount /dev/sda7 /mnt
mount /dev/sda3 /mnt/boot/efi
mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
chroot /mnt
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
exit
umount /mnt/boot/efi
umount /mnt/dev
umount /mnt/proc
umount /mnt/sys
umount /mnt
reboot
