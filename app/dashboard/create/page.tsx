"use client";

import React, { useState } from "react";
import CreateEditCard from "@/components/CreateEditCard";
import Header2 from "@/components/Header2";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { relationStatus, durationUnits } from "@/utils/general/createEditData";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Link from "next/link";

function DashboardCreate() {
  const [dateName, setDateName] = useState<string | undefined>("");
  const [desc, setDesc] = useState<string | undefined>("");
  const [meetCute, setMeetCute] = useState<string | undefined>("");

  const [physical, setPhysical] = useState<number[] | undefined>([5]);
  const [physicalSwitch, setPhysicalSwitch] = useState<boolean>(false);

  const [emotional, setEmotional] = useState<number[] | undefined>([5]);
  const [emotionalSwitch, setEmotionalSwitch] = useState<boolean>(false);

  const [status, setStatus] = useState<string | undefined>();
  const [otherStatus, setOtherStatus] = useState<string | undefined>();

  const [duration, setDuration] = useState<string | undefined>();
  const [unitOfDuration, setUnitOfDuration] = useState<string | undefined>();

  const [futureDates, setFutureDates] = useState<string | undefined>();
  const [futureDatesSwitch, setFutureDatesSwitch] = useState<boolean>(false);

  const [icks, setIcks] = useState<string[]>([]);
  const [greenFlags, setGreenFlags] = useState<string[]>([]);
  const [redFlags, setRedFlags] = useState<string[]>([]);

  const [rating, setRating] = useState<number[] | undefined>([5]);
  const [ratingsSwitch, setRatingsSwitch] = useState<boolean>(false);

  const [additionalComments, setAdditionalComments] = useState<string | undefined>("");

  // NSFW SECTION
  const [NSFWSwitch, setNSFWSwitch] = useState<boolean>(false);

  const [kissingSkills, setKissingSkills] = useState<number[] | undefined>([5])
  const [oralSkills, setOralSkills] = useState<number[] | undefined>([5])
  const [strokeGame, setStrokeGame] = useState<number[] | undefined>([5])
  const [creativity, setCreativity] = useState<number[] | undefined>([5])
  const [kinkLevel, setKinkLevel] = useState<number[] | undefined>([5])
  const [dirtyTalk, setDirtyTalk] = useState<number[] | undefined>([5])
  const [bigO, setBigO] = useState<boolean>(false)

  return (
    <div className="mb-6">
      {/* TOP HEADING */}
      <div className="text-darkText mb-8">
        <Header2 title="Create a Date" />
      </div>
      <form>
        {/* DATE'S NAME OR NICKNAME */}
        <CreateEditCard
          title="Name *"
          description="What's the name of your date?"
        >
          <input
            type="text"
            name="dateName"
            placeholder="John"
            value={dateName}
            onChange={(e) => setDateName(e.target.value)}
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          />
        </CreateEditCard>
        {/* SHORT DESCRIPTION OF DATE */}
        <CreateEditCard
          title="Description *"
          description="Describe this person in a few words"
        >
          <input
            type="text"
            maxLength={50}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name="description"
            placeholder="Waste of time"
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          />
        </CreateEditCard>
        {/* FIRST TIME OF MEETING */}
        <CreateEditCard
          title="First meet *"
          description="How did you two meet?"
        >
          <textarea
            maxLength={100}
            rows={2}
            value={meetCute}
            onChange={(e) => setMeetCute(e.target.value)}
            name="description"
            placeholder="We met at a..."
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          ></textarea>
        </CreateEditCard>
        {/* PHYSICAL ATTRACTION */}
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
        {/* EMOTIONAL ATTRACTION */}
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
        {/* RELATIONSHIP STATUS */}
        <CreateEditCard title="Relationship Status *">
          <select
            name=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
          >
            {relationStatus.map((stat) => {
              return (
                <option value={stat.value} key={stat.value}>
                  {stat.innerText}
                </option>
              );
            })}
          </select>
          {status === "Other" && (
            <div className="mt-3">
              <p className="text-[14px] text-darkText60 mb-1">
                Type another relationship status
              </p>
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
        {/* DATING DURATION */}
        <CreateEditCard
          title="Duration *"
          description="How long have you been seeing this person?"
        >
          <div className="flex gap-4">
            {/* DURATION NUMBER */}
            <div className="flex-[1]">
              <input
                type="number"
                name="dateName"
                min="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-[14px] w-full outline-none border-none rounded-lg py-2 px-5"
              />
            </div>
            {/* DURATION UNIT (EX: 'WEEK', 'MONTH', ETC.) */}
            <div className="flex-[2]">
              <select
                name=""
                onChange={(e) => setUnitOfDuration(e.target.value)}
                value={unitOfDuration}
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
              >
                {durationUnits.map((unit) => {
                  return (
                    <option value={unit} key={unit}>
                      {unit}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </CreateEditCard>
        {/* FUTURE DATES PLANNED */}
        <CreateEditCard
          title="Future Date"
          description="Record a date/meetup planned with this person for the future"
        >
          <input
            type="datetime-local"
            name="futureDate"
            min={0}
            value={futureDates}
            onChange={(e) => setFutureDates(e.target.value)}
            className={`${
              futureDatesSwitch ? "block" : "hidden"
            } text-[14px] lg:w-[70%] md:w-[80%] w-full  outline-none border-none rounded-lg py-2 px-5`}
          />
          <div
            className={`${
              futureDatesSwitch ? "mt-5" : "mt-0"
            } flex items-center gap-3`}
          >
            <Switch
              checked={futureDatesSwitch}
              onCheckedChange={setFutureDatesSwitch}
            />
            <p className="text-[14px]">{futureDatesSwitch ? "" : "None"}</p>
          </div>
        </CreateEditCard>
        {/* ICKS LIST */}
        <CreateEditCard title="List of Icks">
          <List array={icks} setArray={setIcks} name="icks" />
        </CreateEditCard>
        {/* GREEN FLAGS LIST */}
        <CreateEditCard title="List of Green Flags">
          <List array={greenFlags} setArray={setGreenFlags} name="greenFlags" />
        </CreateEditCard>
        {/* RED FLAGS LIST */}
        <CreateEditCard title="List of Red Flags">
          <List array={redFlags} setArray={setRedFlags} name="redFlags" />
        </CreateEditCard>
        {/* RATINGS */}
        <CreateEditCard
          title="Rating"
          description="How would you rate your experience with this person?"
        >
          <div className="">
            <div
              className={`duration-500 gap-8 items-center ${
                ratingsSwitch ? "flex" : "hidden"
              }`}
            >
              <Slider
                min={0}
                max={10}
                step={0.5}
                className="w-[50%]"
                value={rating}
                onValueChange={(text) => setRating(text)}
              />
              <p>{rating}</p>
            </div>
            <div
              className={`${
                ratingsSwitch ? "mt-5" : "mt-0"
              } flex items-center gap-3`}
            >
              <Switch
                checked={ratingsSwitch}
                onCheckedChange={setRatingsSwitch}
              />
              <p className="text-[14px]">{ratingsSwitch ? "" : "Don't know"}</p>
            </div>
          </div>
        </CreateEditCard>
        {/* NSFW ON OR OFF */}
        <CreateEditCard
          title="NSFW"
          description="Turn on to access the NSFW section"
        >
          <div className={`flex items-center gap-3`}>
            <Switch checked={NSFWSwitch} onCheckedChange={setNSFWSwitch} />
            <p className="text-[14px]">{NSFWSwitch ? "Off" : "On"}</p>
          </div>
        </CreateEditCard>
        {NSFWSwitch ? 
            <NSFWContainer>
                <CreateEditCard title='Kissing Skills'>
                    <div
                        className={`duration-500 flex gap-8 items-center`}
                        >
                        <Slider
                            min={0}
                            max={10}
                            step={1}
                            className="w-[50%]"
                            value={kissingSkills}
                            onValueChange={(text) => setKissingSkills(text)}
                        />
                        <p>{kissingSkills}</p>
                    </div>
                </CreateEditCard>
                <CreateEditCard title='Oral Skills'>
                    <div
                        className={`duration-500 flex gap-8 items-center`}
                        >
                        <Slider
                            min={0}
                            max={10}
                            step={1}
                            className="w-[50%]"
                            value={oralSkills}
                            onValueChange={(text) => setOralSkills(text)}
                        />
                        <p>{oralSkills}</p>
                    </div>
                </CreateEditCard>
                <CreateEditCard title='Stroke Game'>
                    <div
                        className={`duration-500 flex gap-8 items-center`}
                        >
                        <Slider
                            min={0}
                            max={10}
                            step={1}
                            className="w-[50%]"
                            value={strokeGame}
                            onValueChange={(text) => setStrokeGame(text)}
                        />
                        <p>{strokeGame}</p>
                    </div>
                </CreateEditCard>
                <CreateEditCard title='Creativity'>
                    <div
                        className={`duration-500 flex gap-8 items-center`}
                        >
                        <Slider
                            min={0}
                            max={10}
                            step={1}
                            className="w-[50%]"
                            value={creativity}
                            onValueChange={(text) => setCreativity(text)}
                        />
                        <p>{creativity}</p>
                    </div>
                </CreateEditCard>
                <CreateEditCard title='Kink Level'>
                    <div
                        className={`duration-500 flex gap-8 items-center`}
                        >
                        <Slider
                            min={0}
                            max={10}
                            step={1}
                            className="w-[50%]"
                            value={kinkLevel}
                            onValueChange={(text) => setKinkLevel(text)}
                        />
                        <p>{kinkLevel}</p>
                    </div>
                </CreateEditCard>
                <CreateEditCard title='Dirty Talk'>
                    <div
                        className={`duration-500 flex gap-8 items-center`}
                        >
                        <Slider
                            min={0}
                            max={10}
                            step={1}
                            className="w-[50%]"
                            value={dirtyTalk}
                            onValueChange={(text) => setDirtyTalk(text)}
                        />
                        <p>{dirtyTalk}</p>
                    </div>
                </CreateEditCard>
                <CreateEditCard title='Big O'>
                <div
                    className={`flex items-center gap-3`}
                >
                    <Switch
                    checked={bigO}
                    onCheckedChange={setBigO}
                    />
                    <p className="text-[14px]">{bigO ? "Yes" : "No"}</p>
                </div>
                </CreateEditCard>
            </NSFWContainer> 
            :
            null}
        <CreateEditCard
                    title="Additional Comments"
                    description="Add any extra comments or information"
                >
                    <textarea
                        value={additionalComments}
                        onChange={(e) => setAdditionalComments(e.target.value)}
                        name="additionalComment"
                        rows={4}
                        className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
                    ></textarea>
        </CreateEditCard>
        <div className="flex justify-end items-center gap-4 mt-4">
            <PrimaryButton type="submit">
                Add Date
            </PrimaryButton>
          <Link href={"/dashboard"}>
            <SecondaryButton>Cancel</SecondaryButton>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DashboardCreate;

type ListProps = {
  array: string[];
  setArray: React.Dispatch<React.SetStateAction<string[]>>;
  name: string;
};

function List({ array, setArray, name }: ListProps) {
  const [value, setValue] = useState("");

  const [updateOn, setUpdateOn] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  function addElement() {
    if (value.length) {
      setArray([...array, value]);
    }
  }

  function updateTrue(i: number) {
    setUpdateOn(true);
    setValue(array[i]);
    setIndex(i);
  }

  function updateElement() {
    // console.log(index)
    if (typeof index === 'number' && value.length) {
      array[index] = value;
      
      setUpdateOn(false);
      setValue("");
    }
  }

  function deleteElement(index: number) {
    const deleteFilter = array.filter((del) => del !== array[index]);

    setArray(deleteFilter);
  }

  return (
    <div>
      {array.length
        ? array.map((arr, i) => {
            return (
              <div
                key={`${arr}_${i}`}
                className="flex items-start justify-between gap-6 text-darkText mb-4 md:w-[80%] w-full"
              >
                <div className="flex gap-3">
                  <div className="text-darkText">
                    <p className="text-[14px] font-medium">{i + 1}.</p>
                  </div>
                  <p className="text-[13px]">{arr}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-pointer duration-500 hover:opacity-60"
                    onClick={() => updateTrue(i)}
                  >
                    <PencilSquareIcon className="w-4" />
                  </div>
                  <div
                    className="cursor-pointer duration-500 hover:opacity-60"
                    onClick={() => deleteElement(i)}
                  >
                    <TrashIcon className="w-4" />
                  </div>
                </div>
              </div>
            );
          })
        : null}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        className={`text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg ${
          array.length ? "mt-4" : "mt-0"
        } py-2 px-5`}
      />
      {updateOn ? (
        <div
          onClick={updateElement}
          className="cursor-pointer bg-darkText text-foreground py-1 px-4 rounded-lg mt-3 flex items-center gap-2 w-fit"
        >
          <p className="text-[14px]">Update</p>
        </div>
      ) : (
        <div
          onClick={addElement}
          className="cursor-pointer bg-darkText text-foreground py-1 px-4 rounded-lg mt-3 flex items-center gap-2 w-fit"
        >
          <PlusIcon className="w-4 text-lightText" />
          <p className="text-[14px]">Add</p>
        </div>
      )}
    </div>
  );
}

function NSFWContainer({ children }: { children: React.ReactNode}) {
  return (
    <div>
      {children}
    </div>
  );
}
