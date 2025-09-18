export class GalleryModel {
    GalleryCode: number;
    DepartmentCode: number | string;
    DepartmentTitle: string;
    DepartmentTitleHindi: string;
    Type: string;
    TypeCode: number | string;
    SchemeCode: number;
    SchemeName: string;
    SchemeNameHindi: string;
    Caption: string;
    Url: string;
    UploadType: string;
    Thumbnail: string;
    ThumbnailViewLink: string;
    IsActive: boolean;
    IsDelete: boolean;
    CreatedBy: number;
    CreatedOn: Date;
    ModifiedBy: number | null;
    ModifiedOn: Date;

    GalleryFileList: GalleryFileModel[] = [];
    DeletedFileCodes: string;
}

export class GalleryFileModel {
    FileCode: number;
    GalleryCode: number;
    FileName: string;
    FilePath: string;
    Extension: string;
}
