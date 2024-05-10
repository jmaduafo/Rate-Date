"use client";

import React, { useState, useEffect } from "react";

import CreateEditCard from "@/components/CreateEditCard";
import Header2 from "@/components/Header2";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Loading from "@/components/Loading";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { createClient } from "@/utils/supabase/client";

import { relationStatus, durationUnits } from "@/utils/general/createEditData";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

function DashboardEdit() {
  const { toast } = useToast();
  const supabase = createClient();

  const router = useRouter();
  // useParams to get slug
  const { id } = useParams();

  const [dateName, setDateName] = useState<string | undefined>("");
  const [age, setAge] = useState<string | undefined>();
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

  const [isStillSeeing, setisStillSeeing] = useState<boolean>(false);

  const [additionalComments, setAdditionalComments] = useState<
    string | undefined
  >("");

  // NSFW SECTION
  const [NSFWSwitch, setNSFWSwitch] = useState<boolean>(false);
  const [kissingSkills, setKissingSkills] = useState<number[] | undefined>([5]);
  const [oralSkills, setOralSkills] = useState<number[] | undefined>([5]);
  const [strokeGame, setStrokeGame] = useState<number[] | undefined>([5]);
  const [creativity, setCreativity] = useState<number[] | undefined>([5]);
  const [kinkLevel, setKinkLevel] = useState<number[] | undefined>([5]);
  const [dirtyTalk, setDirtyTalk] = useState<number[] | undefined>([5]);
  const [bigO, setBigO] = useState<boolean | undefined>(false);

  const [loading, setLoading] = useState<boolean>(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (
      !dateName ||
      !age ||
      !desc ||
      !meetCute ||
      !status ||
      !status.length ||
      !duration ||
      !unitOfDuration
    ) {
      toast({
        title: "Whoops! You left some entries empty",
        description: "Please fill in the starred entries accordingly",
      });
    } else {
      setLoading(true);

      const { error } = await supabase
        .from("dates")
        .update({
          date_name: dateName,
          short_desc: desc,
          date_age: parseInt(age),
          is_seeing: isStillSeeing ? true : false,
          relationship_status: status === "Other" ? otherStatus : status,
          first_meet: meetCute,
          duration_of_dating: duration,
          duration_metric: unitOfDuration,
          physical_attraction: physicalSwitch && physical ? physical[0] : null,
          emotional_attraction:
            emotionalSwitch && emotional ? emotional[0] : null,
          icks,
          green_flags: greenFlags,
          red_flags: redFlags,
          date_schedule: futureDatesSwitch ? futureDates : null,
          rating: ratingsSwitch && rating ? rating[0] : null,
          additional_desc: additionalComments ? additionalComments : null,
          nsfw: NSFWSwitch,
          nsfw_oral_skills: NSFWSwitch && oralSkills ? oralSkills[0] : null,
          nsfw_stroke_game: NSFWSwitch && strokeGame ? strokeGame[0] : null,
          nsfw_kissing_skills:
            NSFWSwitch && kissingSkills ? kissingSkills[0] : null,
          nsfw_kink_level: NSFWSwitch && kinkLevel ? kinkLevel[0] : null,
          nsfw_creativity: NSFWSwitch && creativity ? creativity[0] : null,
          nsfw_dirty_talk: NSFWSwitch && dirtyTalk ? dirtyTalk[0] : null,
          nsfw_big_o: NSFWSwitch ? bigO : null,
        })
        .eq("id", id);

      if (error) {
        toast({
          title: "Something went wrong!",
          description: error.message,
        });

        setLoading(false);
      } else {
        toast({
          title: "Success!",
          description: "Your date was successfully updated!",
        });

        setLoading(false);
        router.push("/dashboard");
      }
    }
  }

  async function getDateByID() {
    const { data, error } = await supabase.from("dates").select().eq("id", id);

    if (error) {
      toast({
        title: "Whoops, we have a problem!",
        description: error.message,
      });
      console.log(error.message);
    } else {
      // REQUIRED INPUTS
      setDateName(data[0]?.date_name);
      setDesc(data[0]?.short_desc);
      setAge(data[0]?.date_age?.toString());
      setMeetCute(data[0].first_meet);
      setDuration(data[0].duration_of_dating?.toString());
      setUnitOfDuration(data[0].duration_metric);
      setisStillSeeing(data[0]?.is_seeing);
      ///////////////

      // PHYSICAL AND EMOTIONAL
      setPhysical(
        data[0]?.physical_attraction
          ? [data[0]?.physical_attraction]
          : undefined
      );
      {
        data[0]?.physical_attraction
          ? setPhysicalSwitch(true)
          : setPhysicalSwitch(false);
      }

      setEmotional(
        data[0]?.emotional_attraction
          ? [data[0]?.emotional_attraction]
          : undefined
      );
      {
        data[0]?.emotional_attraction
          ? setEmotionalSwitch(true)
          : setEmotionalSwitch(false);
      }

      // RELATIONSHIP STATUS

      // CHECKS THROUGH ARRAY TO SEE IF THE STATUS ENTERED IS INCLUDED IN THE ARRAY
      // IF NOT, CHECK THE VALUE OF 'OTHER' AND ADD THE STATUS TO THE 'OTHER STATUS' INPUT
      const scout = relationStatus.find(
        (status) => status.innerText === data[0]?.relationship_status
      );

      if (!scout) {
        setStatus("Other");
        setOtherStatus(data[0]?.relationship_status);
      } else {
        setStatus(data[0]?.relationship_status);
      }

      // FUTURE DATES
      // DATETIME-LOCAL HAS TO BE IN '2000-01-01T00:00:00' FORMAT
      // date_schedule from backend = yyyy-mm-dd 00:00:00+00
      setFutureDates(
        data[0]?.date_schedule
          ? data[0]?.date_schedule.split(" ").join("T").split("+")[0]
          : undefined
      );
      {
        data[0]?.date_schedule
          ? setFutureDatesSwitch(true)
          : setFutureDatesSwitch(false);
      }

      // ICKS, GREEN FLAGS, RED FLAGS
      {
        data[0]?.icks ? setIcks(data[0]?.icks) : [];
      }
      {
        data[0]?.green_flags ? setGreenFlags(data[0]?.green_flags) : [];
      }
      {
        data[0]?.red_flags ? setRedFlags(data[0]?.red_flags) : [];
      }

      // RATING
      setRating(data[0]?.rating ? [data[0]?.rating] : undefined);
      {
        data[0]?.rating ? setRatingsSwitch(true) : setRatingsSwitch(false);
      }

      // ADDITIONAL INFORMATION
      {
        data[0]?.additional_desc
          ? setAdditionalComments(data[0]?.additional_desc)
          : setAdditionalComments(undefined);
      }

      // NSFW SECTION
      setNSFWSwitch(data[0]?.nsfw);
      {
        data[0].nsfw
          ? setKissingSkills([data[0]?.nsfw_kissing_skills])
          : setKissingSkills(undefined);
      }
      {
        data[0].nsfw
          ? setOralSkills([data[0]?.nsfw_oral_skills])
          : setOralSkills(undefined);
      }
      {
        data[0].nsfw
          ? setStrokeGame([data[0]?.nsfw_stroke_game])
          : setStrokeGame(undefined);
      }
      {
        data[0].nsfw
          ? setCreativity([data[0]?.nsfw_creativity])
          : setCreativity(undefined);
      }
      {
        data[0].nsfw
          ? setKinkLevel([data[0]?.nsfw_kink_level])
          : setKinkLevel(undefined);
      }
      {
        data[0].nsfw
          ? setDirtyTalk([data[0]?.nsfw_dirty_talk])
          : setDirtyTalk(undefined);
      }
      {
        data[0].nsfw ? setBigO(data[0]?.nsfw_big_o) : setBigO(undefined);
      }
    }
  }

  useEffect(() => {
    getDateByID();
  }, []);

  return (
    <div className="mb-6">
      {/* TOP HEADING */}
      <div className="text-darkText mb-8">
        <Header2 title="Edit Your Date" />
      </div>
      <form onSubmit={handleUpdate}>
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
        {/* DATE'S NAME OR NICKNAME */}
        <CreateEditCard title="Age *" description="Enter their age">
          <input
            type="number"
            name="age"
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
        {/* BIG O */}
        <CreateEditCard
          title="In Contact *"
          description="Are you still seeing this person?"
        >
          <div className={`flex items-center gap-3`}>
            <Switch
              checked={isStillSeeing}
              onCheckedChange={setisStillSeeing}
            />
            <p className="text-[14px]">{isStillSeeing ? "Yes" : "No"}</p>
          </div>
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
                maxLength={30}
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
                step={0.1}
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
        {/* SHOW NSFW CONTENT IF SWITCH IS ON */}
        {NSFWSwitch ? (
          <NSFWContainer>
            {/* KISSING SKILLS */}
            <CreateEditCard title="Kissing Skills">
              <div className={`duration-500 flex gap-8 items-center`}>
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
            {/* ORAL SKILLS */}
            <CreateEditCard title="Oral Skills">
              <div className={`duration-500 flex gap-8 items-center`}>
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
            {/* STROKE GAME */}
            <CreateEditCard title="Stroke Game">
              <div className={`duration-500 flex gap-8 items-center`}>
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
            {/* CREATIVITY */}
            <CreateEditCard title="Creativity">
              <div className={`duration-500 flex gap-8 items-center`}>
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
            {/* KINK LEVEL */}
            <CreateEditCard title="Kink Level">
              <div className={`duration-500 flex gap-8 items-center`}>
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
            {/* DIRTY TALK */}
            <CreateEditCard title="Dirty Talk">
              <div className={`duration-500 flex gap-8 items-center`}>
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
            {/* BIG O */}
            <CreateEditCard title="Big O">
              <div className={`flex items-center gap-3`}>
                <Switch checked={bigO} onCheckedChange={setBigO} />
                <p className="text-[14px]">{bigO ? "Yes" : "No"}</p>
              </div>
            </CreateEditCard>
          </NSFWContainer>
        ) : null}
        {/* ADDITIONAL COMMENTS */}
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
            {loading ? <Loading classNameColor='border-t-myForeground' classNameSize="w-[30px] h-[30px]" /> : "Update Date"}
          </PrimaryButton>
          <Link href={"/dashboard"}>
            <SecondaryButton>Cancel</SecondaryButton>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DashboardEdit;

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
      setValue("");
    }
  }

  function updateTrue(i: number) {
    setUpdateOn(true);
    setValue(array[i]);
    setIndex(i);
  }

  function updateElement() {
    // console.log(index)
    if (typeof index === "number" && value.length) {
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

function NSFWContainer({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
