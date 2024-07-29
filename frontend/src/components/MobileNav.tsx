import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound, Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import MobileNavLInks from "./MobileNavLInks";

const MobileNav = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-orange-500" />
                {user?.nickname || user?.given_name}
              </span>
            ) : (
              <span className="">Welcome to MernMunch</span>
            )}
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex flex-col gap-4">
            {isAuthenticated ? (
              <MobileNavLInks />
            ) : (
              <Button
                className="flex-1 font-bold bg-orange-500"
                onClick={async () => await loginWithRedirect()}
              >
                Log In
              </Button>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
