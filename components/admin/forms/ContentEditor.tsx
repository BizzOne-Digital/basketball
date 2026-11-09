"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  resetSiteContent,
  saveSiteContent,
} from "@/lib/actions/admin/content";

type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

const IMAGE_KEY = /(image|img|photo|logo|poster|flyer|screenshot|thumbnail|avatar|picture)s?$/i;
const IMAGE_VALUE = /\.(png|jpe?g|webp|gif|avif|svg)$/i;
const LONG_TEXT_KEY = /(body|description|bio|note|intro|text|content|paragraph|summary)/i;

function isObject(value: Json | undefined): value is { [key: string]: Json } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function humanize(key: string) {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isImageField(key: string, value: string) {
  if (IMAGE_VALUE.test(value) || value.startsWith("/api/uploads/")) {
    return true;
  }
  return value === "" && IMAGE_KEY.test(key);
}

const ENUMS: Record<string, string[]> = {
  result: ["W", "L"],
  location: ["home", "away"],
};

function blankFrom(template: Json | undefined, key?: string): Json {
  if (key && ENUMS[key] && typeof template === "string") return ENUMS[key][0];
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  if (Array.isArray(template)) return [];
  if (isObject(template)) {
    return Object.fromEntries(
      Object.entries(template).map(([key, value]) => [key, blankFrom(value, key)]),
    );
  }
  return "";
}

type NodeProps = {
  label: string;
  fieldKey: string;
  value: Json;
  onChange: (next: Json) => void;
  depth: number;
  imageList?: boolean;
};

function Node({ label, fieldKey, value, onChange, depth, imageList }: NodeProps) {
  if (typeof value === "string") {
    const options = ENUMS[fieldKey];

    if (options) {
      return (
        <label className="block space-y-1">
          <span className="text-sm font-medium text-[#04101F]">{label}</span>
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
          >
            {!options.includes(value) ? <option value={value}>{value}</option> : null}
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      );
    }

    if (imageList || isImageField(fieldKey, value)) {
      return (
        <ImageUploadField
          label={label}
          folder="pages"
          value={value}
          onChange={onChange}
          deferDelete
          hint="Upload a JPG, PNG, WebP or GIF (max 8MB). Existing site images can also be replaced."
        />
      );
    }

    const long = value.length > 70 || value.includes("\n") || LONG_TEXT_KEY.test(fieldKey);

    return (
      <label className="block space-y-1">
        <span className="text-sm font-medium text-[#04101F]">{label}</span>
        {long ? (
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))}
            className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block space-y-1">
        <span className="text-sm font-medium text-[#04101F]">{label}</span>
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-[#B7C0CC]/50 px-3 py-2 text-sm"
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium text-[#04101F]">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
        {label}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const template = value[0];
    const imageItems =
      (template === undefined || typeof template === "string") &&
      IMAGE_KEY.test(fieldKey);

    const move = (index: number, delta: number) => {
      const target = index + delta;
      if (target < 0 || target >= value.length) return;
      const copy = [...value];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      onChange(copy);
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#04101F]">
            {label} <span className="font-normal text-[#343A40]">({value.length})</span>
          </p>
          <button
            type="button"
            onClick={() => onChange([...value, blankFrom(template ?? "")])}
            className="inline-flex items-center gap-1 rounded-md bg-[#0B2F63] px-3 py-1 text-xs text-white hover:bg-[#04101F]"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>
        {value.length === 0 ? (
          <p className="text-xs text-[#343A40]">Nothing here yet.</p>
        ) : null}
        {value.map((item, index) => (
          <div
            key={index}
            className="space-y-3 rounded-lg border border-[#B7C0CC]/40 bg-white p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-[#343A40]">
                #{index + 1}
              </span>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" className="rounded p-1 hover:bg-[#F7F9FC] disabled:opacity-30">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === value.length - 1} aria-label="Move down" className="rounded p-1 hover:bg-[#F7F9FC] disabled:opacity-30">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  aria-label="Remove item"
                  className="rounded p-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Node
              label={typeof item === "string" ? label.replace(/s$/, "") : "Item"}
              fieldKey={imageItems ? fieldKey : `${fieldKey}-item`}
              value={item}
              imageList={imageItems}
              depth={depth + 1}
              onChange={(next) => {
                const copy = [...value];
                copy[index] = next;
                onChange(copy);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (isObject(value)) {
    const entries = Object.entries(value);
    const keyedRecord =
      entries.length > 1 &&
      entries.every(([, v]) => typeof v === "object" && v !== null) &&
      entries.every(([k]) => /\d/.test(k));

    return (
      <fieldset
        className={
          depth === 0
            ? "space-y-4"
            : "space-y-4 rounded-lg border border-[#B7C0CC]/40 bg-[#F7F9FC] p-4"
        }
      >
        {depth > 0 ? (
          <legend className="px-1 text-sm font-semibold text-[#04101F]">{label}</legend>
        ) : null}
        {entries.map(([key, child]) => (
          <div key={key} className="space-y-2">
            {keyedRecord ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const rest = { ...value };
                    delete rest[key];
                    onChange(rest);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-red-600"
                >
                  <Trash2 className="h-3 w-3" /> Remove {key}
                </button>
              </div>
            ) : null}
            <Node
              label={humanize(key)}
              fieldKey={key}
              value={child}
              depth={depth + 1}
              onChange={(next) => onChange({ ...value, [key]: next })}
            />
          </div>
        ))}
        {keyedRecord ? (
          <button
            type="button"
            onClick={() => {
              const name = window.prompt("New entry name (for example 2026-27):")?.trim();
              if (!name) return;
              if (name in value) {
                toast.error("That entry already exists.");
                return;
              }
              onChange({ ...value, [name]: blankFrom(entries[0][1]) });
            }}
            className="inline-flex items-center gap-1 rounded-md bg-[#0B2F63] px-3 py-1 text-xs text-white hover:bg-[#04101F]"
          >
            <Plus className="h-3 w-3" /> Add entry
          </button>
        ) : null}
      </fieldset>
    );
  }

  return null;
}

type ContentEditorProps = {
  contentKey: string;
  label: string;
  description: string;
  publicPath: string;
  initialData: Json;
  customized: boolean;
};

export function ContentEditor({
  contentKey,
  label,
  description,
  publicPath,
  initialData,
  customized,
}: ContentEditorProps) {
  const [data, setData] = useState<Json>(initialData);
  const [isCustomized, setIsCustomized] = useState(customized);
  const [pending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const result = await saveSiteContent(contentKey, data);
      if (result.success) {
        setIsCustomized(true);
        toast.success("Saved. The public page is updated.");
      } else {
        toast.error(result.error);
      }
    });
  };

  const reset = () => {
    if (!window.confirm("Reset this block to the original site content? Your edits and uploaded images for it will be removed.")) {
      return;
    }
    startTransition(async () => {
      const result = await resetSiteContent(contentKey);
      if (result.success) {
        toast.success("Reset to original content. Reloading...");
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#04101F]">{label}</h1>
          <p className="text-sm text-[#343A40]">{description}</p>
          <p className="mt-1 text-xs text-[#343A40]">
            {isCustomized ? "Customized in the admin portal." : "Showing the original site content."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={publicPath}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-lg border border-[#B7C0CC]/60 px-3 py-2 text-sm text-[#04101F] hover:bg-[#F7F9FC]"
          >
            View page <ExternalLink className="h-4 w-4" />
          </Link>
          {isCustomized ? (
            <button
              type="button"
              onClick={reset}
              disabled={pending}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              Reset to original
            </button>
          ) : null}
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="rounded-lg bg-[#0B2F63] px-5 py-2 text-sm font-medium text-white hover:bg-[#04101F] disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[#B7C0CC]/40 bg-white p-6">
        <Node
          label={label}
          fieldKey={contentKey}
          value={data}
          depth={0}
          onChange={setData}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-lg bg-[#0B2F63] px-5 py-2 text-sm font-medium text-white hover:bg-[#04101F] disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}
