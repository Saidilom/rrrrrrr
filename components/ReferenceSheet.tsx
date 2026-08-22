"use client";

const FORMULAS: { label: string; body: string }[] = [
  { label: "Circle", body: "A = πr²   C = 2πr" },
  { label: "Rectangle", body: "A = ℓw" },
  { label: "Triangle", body: "A = ½bh" },
  { label: "Right triangle", body: "c² = a² + b²" },
  { label: "Special right triangles", body: "30-60-90 → x, x√3, 2x    45-45-90 → s, s, s√2" },
  { label: "Rectangular solid", body: "V = ℓwh" },
  { label: "Cylinder", body: "V = πr²h" },
  { label: "Sphere", body: "V = (4/3)πr³" },
  { label: "Cone", body: "V = (1/3)πr²h" },
  { label: "Pyramid", body: "V = (1/3)ℓwh" },
];

export default function ReferenceSheet() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {FORMULAS.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-gray-200 bg-cb-panel px-5 py-4"
          >
            <p className="mb-1.5 text-[13px] font-semibold uppercase tracking-wide text-cb-gray">
              {f.label}
            </p>
            <p className="cb-prose-math text-[18px]">{f.body}</p>
          </div>
        ))}
      </div>
      <ul className="mt-6 space-y-1.5 text-[14px] leading-relaxed text-cb-gray">
        <li>The number of degrees of arc in a circle is 360.</li>
        <li>The number of radians of arc in a circle is 2π.</li>
        <li>The sum of the measures in degrees of the angles of a triangle is 180.</li>
      </ul>
    </div>
  );
}
