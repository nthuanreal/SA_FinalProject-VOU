package adapter

import (
	"context"
	"fmt"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type CloudinaryAdapter interface {
}

type cloudinaryAdapter struct {
	client *cloudinary.Cloudinary
}

// Initialize the Cloudinary client
func NewCloudinaryAdapter(cloudName, apiKey, apiSecret string) (CloudinaryAdapter, error) {
	cld, err := cloudinary.NewFromParams(cloudName, apiKey, apiSecret)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Cloudinary: %w", err)
	}
	return &cloudinaryAdapter{client: cld}, nil
}

// UploadFile uploads a file to Cloudinary and returns its public URL
func (a *cloudinaryAdapter) UploadFile(ctx context.Context, filePath string, publicID string) (string, error) {
	resp, err := a.client.Upload.Upload(ctx, filePath, uploader.UploadParams{
		PublicID: publicID,
		Folder:   "your_folder_name",
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload file: %w", err)
	}
	return resp.SecureURL, nil
}

// // GetFileURL constructs the public URL for an uploaded file
// func (a *cloudinaryAdapter) GetFileURL(publicID string) string {
// 	return a.client.Image(publicID).URL()
// }
