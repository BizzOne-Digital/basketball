import type { SeasonSchedule } from "@/lib/content/season-schedules";

interface SeasonScheduleProps {
  schedule: SeasonSchedule;
  heading?: string;
}

export function SeasonSchedule({ schedule, heading }: SeasonScheduleProps) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {heading ? (
          <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-mountie-white sm:text-4xl">
            {heading}
          </h2>
        ) : (
          <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-mountie-white sm:text-4xl">
            Schedule &amp; Results
          </h2>
        )}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-ice-blue/40 bg-midnight/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ice-blue">
            Overall {schedule.record}
          </span>
          {schedule.conferenceRecord ? (
            <span className="inline-flex items-center rounded-full border border-white/15 bg-gunmetal/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-mountie-silver">
              Conf {schedule.conferenceRecord}
              {schedule.conferenceRank ? ` · ${schedule.conferenceRank}` : ""}
            </span>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20">
        <ul className="divide-y divide-white/5">
          {schedule.games.map((game, index) => (
            <li
              key={`${game.date}-${game.opponent}-${index}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:px-6"
            >
              <div className="w-16 shrink-0 sm:w-20">
                <p className="font-display text-sm uppercase tracking-[0.08em] text-mountie-white">
                  {game.date}
                </p>
                {game.time ? (
                  <p className="text-xs text-mountie-silver/70">{game.time}</p>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-mountie-silver/60">
                  {game.location === "home" ? "vs" : "@"}
                </span>
                <span className="truncate font-medium text-mountie-white">
                  {game.opponent}
                  {game.conference ? (
                    <span className="ml-1 text-ice-blue/70">*</span>
                  ) : null}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-display text-sm ${
                    game.result === "W"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {game.result}
                </span>
                <span className="w-16 text-right font-display text-base tracking-[0.04em] text-mountie-white">
                  {game.score}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-mountie-silver/60">* Conference game</p>
    </div>
  );
}
