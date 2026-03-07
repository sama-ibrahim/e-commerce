import { AuthGuard, RolesGuard } from "@common/guards"
import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./roles.decorator"

export const Auth = (roles :string []) => {

return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard,RolesGuard)
)
}