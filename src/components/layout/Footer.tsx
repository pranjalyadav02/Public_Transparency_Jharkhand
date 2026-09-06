import React from 'react';
import { Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-semibold text-gray-900">JanaSamadhan</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Public accountability, transparency, and open-information platform for Jharkhand's societal innovation ecosystem.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Problems</li>
              <li>Projects</li>
              <li>Solutions</li>
              <li>Infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Accountability</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Contract Transparency</li>
              <li>SLA Performance</li>
              <li>Integrity Statistics</li>
              <li>Verified Findings</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Data & About</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Open Data</li>
              <li>Methodology</li>
              <li>AI Transparency</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2026 Jharkhand Societal Innovation Ecosystem. All data is verified unless otherwise marked.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>Powered by Public Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
