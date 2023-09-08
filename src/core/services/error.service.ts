import { Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
// import { I18nService } from 'nestjs-i18n';
import { CONSTANTS } from '../../app.constants';
import { ApiErrorDto, ApiException, AppUtil, ValidationFailedException } from '../../shared';

@Injectable({})
export class ErrorService {
  VALIDATION_ERROR_PREFIX = 'VALIDATIONS.';

  // constructor(private readonly i18n: I18nService) { }
  constructor() {}

  public async getErrorMessage(lang: string, key: string, args?: Record<string, any>): Promise<string> {
    // const message = await this.i18n.translate(CONSTANTS.ERROR_MESSAGE_KEY_PREFIX + key, { lang, args });
    const message = CONSTANTS.ERROR_MESSAGE_KEY_PREFIX;
    return message;
  }

  public async getUnexpectedError(lang: string): Promise<ApiErrorDto[]> {
    const errors: ApiErrorDto[] = [];

    errors.push({
      name: 'UNEXPECTED_ERROR',
      message: await this.getErrorMessage(lang, 'UNEXPECTED_ERROR'),
    });

    return errors;
  }

  public async getUnAuthorizedError(lang: string): Promise<ApiErrorDto[]> {
    const errors: ApiErrorDto[] = [];

    errors.push({
      name: 'UNAUTHORIZED',
      message: await this.getErrorMessage(lang, 'UNAUTHORIZED'),
    });

    return errors;
  }
  public async getBadRequestError(lang: string): Promise<ApiErrorDto[]> {
    const errors: ApiErrorDto[] = [];

    errors.push({
      name: 'BAD REQUEST',
      message: await this.getErrorMessage(lang, 'BAD REQUEST'),
    });

    return errors;
  }

  public async getResourceNotFoundError(lang: string): Promise<ApiErrorDto[]> {
    const errors: ApiErrorDto[] = [];

    errors.push({
      name: 'RESOURCE_NOT_FOUND',
      message: await this.getErrorMessage(lang, 'RESOURCE_NOT_FOUND'),
    });

    return errors;
  }

  public async getErrorsFromApiException(exception: ApiException, lang: string): Promise<ApiErrorDto[]> {
    const errors: ApiErrorDto[] = [];

    errors.push({
      name: exception.key,
      message: await this.getErrorMessage(lang, exception.key, exception.args),
    });

    return errors;
  }

  public getErrorsFromValidationFailedException(exception: ValidationFailedException, lang: string): ApiErrorDto[] {
    const errors: ApiErrorDto[] = [];

    for (const error of exception.validationErrors) {
      errors.push(this._getErrorFromValidationError(error.property, error, lang));
    }
    return errors;
  }

  private _getErrorFromValidationError(
    propertyName: string,
    validationError: ValidationError,
    lang: string
  ): ApiErrorDto {
    if (validationError.children && validationError.children.length > 0) {
      return this._getErrorFromValidationError(
        this._getPropertyName(propertyName, validationError),
        validationError.children[0],
        lang
      );
    }

    const { isNotEmpty, isEmail, isLength, maxLength, isNumber, max, arrayMaxSize, IsFile, HasMimeType, MaxFileSize } =
      validationError.constraints;

    if (isNotEmpty) {
      return { name: propertyName, message: isNotEmpty };
      // return await this.getErrorMessage(lang, this.VALIDATION_ERROR_PREFIX + "isNotEmpty", { field: validationError.property });
    }

    if (IsFile) {
      return { name: propertyName, message: IsFile };
    }

    if (isEmail) {
      return { name: propertyName, message: isEmail };
    }

    if (isLength) {
      return { name: propertyName, message: isLength };
    }

    if (maxLength) {
      return { name: propertyName, message: maxLength };
    }

    if (isNumber) {
      return { name: propertyName, message: isNumber };
    }

    if (MaxFileSize) {
      return { name: propertyName, message: MaxFileSize };
    }

    if (HasMimeType) {
      return { name: propertyName, message: HasMimeType };
    }

    if (max) {
      return { name: propertyName, message: max };
    }

    if (arrayMaxSize) {
      return { name: propertyName, message: arrayMaxSize };
    }

    return null;
  }

  private _getPropertyName(propertyName, validationError: ValidationError): string {
    if (AppUtil.isNumber(parseInt(validationError.children[0].property))) {
      propertyName = propertyName + '[' + validationError.children[0].property + ']';
    } else {
      propertyName = propertyName + '.' + validationError.children[0].property;
    }
    return propertyName;
  }
}
