import { forwardRef, HTMLAttributes } from "react";
import { Avatar, AvatarProps } from "../avatar/Avatar";
import { Typography } from "../typography/Typography";
import { Stacks } from "../stacks/Stacks";

export interface UserProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  avatar?: AvatarProps;
  className?: string;
}

const User = forwardRef<HTMLDivElement, UserProps>(
  ({ name, description, avatar, className, ...props }, ref) => {
    return (
      <Stacks gap={8} ref={ref} className={className} {...props}>
        <Avatar alt={name} {...avatar} />
        <Stacks direction="column" gap={4}>
          <Typography variant="span">{name || "Name"}</Typography>
          <Typography color="info" variant="span">
            {description || "Description"}
          </Typography>
        </Stacks>
      </Stacks>
    );
  },
);

User.displayName = "User";

export { User };
