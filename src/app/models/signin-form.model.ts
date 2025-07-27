import { FormControl } from "@angular/forms";

export type SigninFormModel = {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}