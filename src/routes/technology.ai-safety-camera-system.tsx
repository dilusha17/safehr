import { AppIcon } from "@/components/AppIcon";
import { createFileRoute } from "@tanstack/react-router";

import { aiCamera } from "@/data/content";
import { seo } from "@/lib/seo";
import { TechnologyPage } from "@/components/tech/TechnologyPage";
import { IllustrativeCamera } from "@/components/tech/IllustrativeCamera";

export const Route = createFileRoute("/technology/ai-safety-camera-system")({
  head: () => seo("AI Safety Camera System", aiCamera.summary, "/technology/ai-safety-camera-system"),
  component: AiCameraPage,
});

function AiCameraPage() {
  return (
    <TechnologyPage
      content={aiCamera}
      visual={<IllustrativeCamera />}
      afterHero={
        <section className="border-b border-line bg-surface" aria-labelledby="privacy-h">
          <div className="container-page flex gap-4 py-10">
            <AppIcon name="privacy" size=32 />
            <div className="max-w-3xl">
              <h2 id="privacy-h" className="text-2xl text-navy-900">Privacy and responsible use</h2>
              {/* TODO: owner to confirm data-handling details and Privacy Act 2020 wording */}
              <p className="mt-2 text-ink">Camera monitoring involves people's images. We help you plan notification of workers, access to footage, retention and storage before anything is switched on. Talk to us about how this would work at your site.</p>
              <p className="mt-3 text-sm text-muted-foreground">The system helps detect risks earlier; it does not replace your other safety controls.</p>
              <p className="mt-2 text-xs text-muted-foreground"><span className="font-semibold">Looking ahead:</span> future ideas such as predictive risk scoring are not current features.</p>
            </div>
          </div>
        </section>
      }
    />
  );
}
