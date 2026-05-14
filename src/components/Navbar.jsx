"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <nav className="flex justify-between bg-white p-5">
      <ul className="flex gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>

        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          height={150}
          width={150}
          alt="logo"
          className="w-40"
        />
      </div>

      <>
        {user ? (
          <div className="flex gap-3">
            <Avatar size="sm">
              <Avatar.Image
                alt="User"
                src={user?.image}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>

            <Button size="sm" variant="danger">
              SignOut
            </Button>
          </div>
        ) : (
          <ul className="flex items-center  text-sm gap-5">
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/signup"}>Sign Up</Link>
            </li>
          </ul>
        )}
      </>

    </nav>
  );
};

export default Navbar;
