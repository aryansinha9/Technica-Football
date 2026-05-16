-- Allow public access to read files from the site-assets bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'site-assets' );

-- Allow authenticated admins to upload files into the site-assets bucket
CREATE POLICY "Admins can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'site-assets' );

-- Allow authenticated admins to update files in the site-assets bucket
CREATE POLICY "Admins can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'site-assets' );

-- Allow authenticated admins to delete files in the site-assets bucket
CREATE POLICY "Admins can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'site-assets' );
