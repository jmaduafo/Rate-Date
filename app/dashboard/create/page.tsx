"use client";

import React, { useState } from "react";
import CreateEditCard from "@/components/CreateEditCard";
import Header2 from "@/components/Header2";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { relationStatus } from "@/utils/general/createEditData";

function DashboardCreate() {
  const [dateName, setDateName] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [meetCute, setMeetCute] = useState<string | null>(null);
  const [physical, setPhysical] = useState<number[] | undefined>([0]);
  const [physicalSwitch, setPhysicalSwitch] = useState<boolean>(false);
  const [emotional, setEmotional] = useState<number[] | undefined>([0]);
  const [emotionalSwitch, setEmotionalSwitch] = useState<boolean>(false);
  const [status, setStatus] = useState<string | undefined>();
  const [otherStatus, setOtherStatus] = useState<string | undefined>();

  return (
    <div>
      <div className="text-darkText mb-8">
        <Header2 title="Create a Date" />
      </div>
      <form>
        <CreateEditCard
          title="Name *"
          description="What's the name of your date?"
        >
          <input
            type="text"
            name="dateName"
            placeholder="John"
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          />
        </CreateEditCard>
        <CreateEditCard
          title="Description *"
          description="Describe this person in a few words"
        >
          <input
            type="text"
            maxLength={50}
            name="description"
            placeholder="Waste of time"
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          />
        </CreateEditCard>
        <CreateEditCard title="First meet *" description="How did you two meet?">
          <textarea
            maxLength={100}
            rows={2}
            name="description"
            placeholder="We met at a..."
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          ></textarea>
        </CreateEditCard>
        <CreateEditCard
          title="Physical Attraction"
          description="How much are you attracted to them on the outside?"
        >
          <div className="">
            <div
              className={`duration-500 gap-8 items-center ${
                physicalSwitch ? "flex" : "hidden"
              }`}
            >
              <Slider
                min={0}
                max={10}
                defaultValue={[5]}
                step={1}
                className="w-[50%]"
                value={physical}
                onValueChange={(text) => setPhysical(text)}
              />
              <p>{physical}</p>
            </div>
            <div
              className={`${
                physicalSwitch ? "mt-5" : "mt-0"
              } flex items-center gap-3`}
            >
              <Switch
                checked={physicalSwitch}
                onCheckedChange={setPhysicalSwitch}
              />
              <p className="text-[14px]">
                {physicalSwitch ? "" : "Don't know"}
              </p>
            </div>
          </div>
        </CreateEditCard>
        <CreateEditCard
          title="Emotional Attraction"
          description="How much are you attracted to them on the inside?"
        >
          <div className="">
            <div
              className={`duration-500 gap-8 items-center ${
                emotionalSwitch ? "flex" : "hidden"
              }`}
            >
              <Slider
                min={0}
                max={10}
                defaultValue={[5]}
                step={1}
                className="w-[50%]"
                value={emotional}
                onValueChange={(text) => setEmotional(text)}
              />
              <p>{emotional}</p>
            </div>
            <div
              className={`${
                emotionalSwitch ? "mt-5" : "mt-0"
              } flex items-center gap-3`}
            >
              <Switch
                checked={emotionalSwitch}
                onCheckedChange={setEmotionalSwitch}
              />
              <p className="text-[14px]">
                {emotionalSwitch ? "" : "Don't know"}
              </p>
            </div>
          </div>
        </CreateEditCard>
        <CreateEditCard title="Relationship Status *">
          <select
            name=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          >
            {relationStatus.map((stat) => {
              return <option value={stat.value}>{stat.innerText}</option>;
            })}
          </select>
          {status === "Other" && (
            <div className="mt-3">
                <p className="text-[14px] text-darkText60 mb-1">Type another relationship status</p>
              <input
                type="text"
                name="status"
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
                value={otherStatus}
                onChange={(e) => setOtherStatus(e.target.value)}
              />
            </div>
          )}
        </CreateEditCard>
        <CreateEditCard
          title="Name"
          description="What's the name of your date?"
        >
          <input
            type="text"
            name="dateName"
            placeholder="John"
            className="w-[70%] outline-none border-none rounded-lg py-2 px-5"
          />
        </CreateEditCard>
      </form>
    </div>
  );
}

export default DashboardCreate;
