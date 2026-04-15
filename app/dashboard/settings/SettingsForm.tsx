"use client";

import { useState } from "react";

interface SettingsFormProps {
  user: {
    name: string;
    email: string;
  };
}

export default function SettingsForm({ user }: SettingsFormProps) {
  // Profile state
  const [name, setName] = useState(user.name);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");
    setProfileLoading(true);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setProfileError(data.error || "Erreur lors de la mise a jour.");
      } else {
        setProfileMsg("Profil mis a jour avec succes.");
      }
    } catch {
      setProfileError("Une erreur est survenue.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg("");
    setPasswordError("");

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "Le nouveau mot de passe doit contenir au moins 8 caracteres."
      );
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Erreur lors du changement.");
      } else {
        setPasswordMsg("Mot de passe mis a jour avec succes.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch {
      setPasswordError("Une erreur est survenue.");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Profile Section */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Profil</h2>

          {profileMsg && (
            <div className="alert alert-success">
              <span>{profileMsg}</span>
            </div>
          )}
          {profileError && (
            <div className="alert alert-error">
              <span>{profileError}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nom</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={user.email}
                readOnly
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  L&apos;email ne peut pas etre modifie.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={profileLoading}
            >
              {profileLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Enregistrer"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Password Section */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Mot de passe</h2>

          {passwordMsg && (
            <div className="alert alert-success">
              <span>{passwordMsg}</span>
            </div>
          )}
          {passwordError && (
            <div className="alert alert-error">
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Mot de passe actuel
                </span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Nouveau mot de passe
                </span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Confirmer le nouveau mot de passe
                </span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={passwordLoading}
            >
              {passwordLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Changer le mot de passe"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
