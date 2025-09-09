export interface UploadOptions {
    folder: string,
    resource_type: "video" | "image" | "raw" | "auto" | undefined,
    tags?: string[],
    context?: string
}   