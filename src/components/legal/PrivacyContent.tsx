"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function PrivacyContent() {
  return (
    <Card className="w-full">
      <CardContent className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              Welcome to <strong>Simply Dev</strong>. Our Privacy Policy
              explains how we collect, safeguard, and disclose information
              resulting from your use of <strong>mechmentor.app</strong>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Definitions</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              “Personal Data” means information about an identified or
              identifiable individual. “Usage Data” is data collected
              automatically from your use of the Service. “Cookies” are small
              files stored on your device.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            3. Information Collection and Use
          </h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              We collect various types of information to provide and improve the
              Service, including Personal Data, Usage Data, and information via
              cookies and similar technologies.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Types of Data Collected</h2>
          <div className="mt-2 text-sm leading-6">
            <ul className="list-disc ml-6 space-y-1">
              <li>Personal Data (e.g., email, name, address, phone)</li>
              <li>
                Usage Data (e.g., IP address, browser, pages visited,
                timestamps)
              </li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Use of Data</h2>
          <div className="mt-2 text-sm leading-6">
            <ul className="list-disc ml-6 space-y-1">
              <li>Operate and maintain the Service</li>
              <li>Notify you of changes and provide support</li>
              <li>
                Monitor usage, detect, prevent, and address technical issues
              </li>
              <li>Communicate updates and offers (you may opt out)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Retention and Transfer</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              We retain Personal Data only as long as necessary for the purposes
              set out in this policy. Data may be processed outside your
              jurisdiction with appropriate safeguards.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Disclosure</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              We may disclose information to comply with legal obligations,
              protect rights, or as part of a business transaction. Service
              providers may access Personal Data solely to perform tasks on our
              behalf and are bound by confidentiality.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Security</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              We use commercially acceptable means to protect Personal Data but
              cannot guarantee absolute security.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Your Rights</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              Depending on your location, you may have rights to access,
              correct, delete, object to processing, restrict processing, and
              data portability. You can withdraw consent where applicable.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Children’s Privacy</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              Our Service is not intended for individuals under 18. We do not
              knowingly collect data from children under 18.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Changes</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>
              We may update this policy from time to time. Changes are effective
              when posted on this page.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Contact</h2>
          <div className="mt-2 space-y-3 text-sm leading-6">
            <p>Questions? Contact us using one of the following methods:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Discord:</strong>{" "}
                <Link href="https://discord.gg/pxSbdEw3zc">
                  Use the Discord Help channel
                </Link>
              </li>
              <li>
                <strong>Bluesky:</strong>{" "}
                <Link href="https://bsky.app/profile/simplygeo.bsky.social">
                  Direct Message via Bluesky
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
